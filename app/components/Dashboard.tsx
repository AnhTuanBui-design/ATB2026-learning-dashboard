'use client';

import { useState, useMemo, useEffect } from 'react';
import { Category, CAT_META, CAT_ORDER, SEED_NOTES, Note } from '@/app/data/notes';
import { supabase } from '@/lib/supabase';
import { Sidebar } from './Sidebar';
import { NoteCard } from './NoteCard';
import { AddNoteModal } from './AddNoteModal';
import { CatIcon, SearchIcon, PlusIcon } from './icons';

export function Dashboard() {
  const [activeCat, setActiveCat] = useState<Category | 'all'>('all');
  const [query, setQuery] = useState('');
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Note | null>(null);

  useEffect(() => {
    async function loadNotes() {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) { console.error(error); return; }

      if (data && data.length > 0) {
        setNotes(data as Note[]);
      } else {
        // Seed initial notes on first load
        const { data: inserted, error: seedError } = await supabase
          .from('notes')
          .insert(SEED_NOTES.map(({ id: _, ...n }) => n))
          .select();
        if (!seedError && inserted) setNotes(inserted as Note[]);
      }
      setLoading(false);
    }
    loadNotes();
  }, []);

  const toggleStar = async (id: number) => {
    const note = notes.find(n => n.id === id);
    if (!note) return;
    const newFav = !note.fav;
    setNotes(ns => ns.map(n => n.id === id ? { ...n, fav: newFav } : n));
    await supabase.from('notes').update({ fav: newFav }).eq('id', id);
  };

  const addNote = async (fields: { cat: Category; title: string; code: string; desc: string; tags: string[] }) => {
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const now = new Date();
    const date = `${months[now.getMonth()]} ${now.getDate()}`;
    const { data, error } = await supabase
      .from('notes')
      .insert({ ...fields, fav: false, date })
      .select()
      .single();
    if (!error && data) {
      setNotes(ns => [data as Note, ...ns]);
      setShowModal(false);
    }
  };

  const updateNote = async (fields: { cat: Category; title: string; code: string; desc: string; tags: string[] }) => {
    if (!editing) return;
    setNotes(ns => ns.map(n => n.id === editing.id ? { ...n, ...fields } : n));
    await supabase.from('notes').update(fields).eq('id', editing.id);
    setEditing(null);
  };

  const deleteNote = async (id: number) => {
    setNotes(ns => ns.filter(n => n.id !== id));
    await supabase.from('notes').delete().eq('id', id);
  };

  const q = query.trim().toLowerCase();

  const filtered = useMemo(() => notes.filter(n => {
    if (activeCat !== 'all' && n.cat !== activeCat) return false;
    if (!q) return true;
    return (n.title + ' ' + n.code + ' ' + n.desc + ' ' + n.tags.join(' ')).toLowerCase().includes(q);
  }), [notes, activeCat, q]);

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    CAT_ORDER.forEach(id => { c[id] = notes.filter(n => n.cat === id).length; });
    return c;
  }, [notes]);

  const headerTitle = activeCat === 'all' ? 'All Notes' : CAT_META[activeCat].name;

  return (
    <>
    {showModal && <AddNoteModal onSave={addNote} onClose={() => setShowModal(false)} />}
    {editing && <AddNoteModal note={editing} onSave={updateNote} onClose={() => setEditing(null)} />}
    <div className="flex h-screen w-full overflow-hidden" style={{ fontFamily: "'Inter', system-ui, sans-serif", background: '#fff', color: 'rgb(23,23,23)', WebkitFontSmoothing: 'antialiased' }}>
      <Sidebar activeCat={activeCat} counts={counts} total={notes.length} onSelect={setActiveCat} />

      <main className="dash-scroll flex-1 h-full overflow-y-auto">
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '34px 48px 64px' }}>

          {/* Header */}
          <div className="flex items-start justify-between flex-wrap gap-6 mb-6">
            <div>
              <div className="font-bold" style={{ fontSize: '28px', letterSpacing: '-0.02em', lineHeight: 1.2 }}>{headerTitle}</div>
              <div className="mt-1" style={{ fontSize: '16px', color: 'rgb(82,82,82)' }}>Your personal dev learning notebook</div>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 border-none rounded-lg cursor-pointer font-semibold"
              style={{ background: 'rgb(127,86,217)', color: '#fff', padding: '11px 16px', fontSize: '15px', boxShadow: '0 1px 2px rgba(16,24,40,0.08)', fontFamily: 'inherit' }}
            >
              <PlusIcon />
              Add Note
            </button>
          </div>

          {/* Stat cards */}
          <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: 'repeat(6, 1fr)' }}>
            {CAT_ORDER.map(id => {
              const meta = CAT_META[id];
              const active = activeCat === id;
              return (
                <button
                  key={id}
                  onClick={() => setActiveCat(id)}
                  className="stat-card flex items-center gap-3.5 text-left cursor-pointer rounded-xl border-none"
                  style={{
                    padding: '16px 18px',
                    background: '#fff',
                    border: active ? `1px solid ${meta.border}` : '1px solid rgb(229,229,229)',
                    boxShadow: active ? `0 0 0 3px ${meta.tint}` : '0 1px 2px rgba(16,24,40,0.05)',
                    fontFamily: 'inherit',
                  }}
                >
                  <span className="flex items-center justify-center flex-none rounded-[10px]" style={{ width: 40, height: 40, background: meta.tint, color: meta.color }}>
                    <CatIcon id={id} />
                  </span>
                  <span className="flex flex-col items-start" style={{ lineHeight: 1.15 }}>
                    <span className="font-bold" style={{ fontSize: '20px', color: 'rgb(23,23,23)' }}>{counts[id] ?? 0}</span>
                    <span style={{ fontSize: '13px', color: 'rgb(82,82,82)' }}>{meta.name}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <SearchIcon />
            </span>
            <input
              className="search-in w-full border rounded-[10px] text-base outline-none bg-white"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search notes, commands, shortcuts…"
              style={{ height: '48px', border: '1px solid rgb(212,212,212)', padding: '0 16px 0 46px', fontSize: '16px', fontFamily: 'inherit', color: 'rgb(23,23,23)', boxShadow: '0 1px 2px rgba(16,24,40,0.05)' }}
            />
          </div>

          {/* Notes grid */}
          {loading ? (
            <div className="text-center py-16" style={{ color: 'rgb(115,115,115)', fontSize: '16px' }}>Loading notes…</div>
          ) : (
            <div style={{ columnCount: 3, columnGap: '24px' }}>
              {filtered.map(note => (
                <NoteCard key={note.id} note={note} onStar={() => toggleStar(note.id)} onEdit={() => setEditing(note)} onDelete={() => deleteNote(note.id)} />
              ))}
              {filtered.length === 0 && (
                <div className="text-center py-16" style={{ color: 'rgb(115,115,115)', fontSize: '16px' }}>
                  No notes match your search.
                </div>
              )}
            </div>
          )}

        </div>
      </main>
    </div>
    </>
  );
}
