'use client';

import { useState } from 'react';
import { Category, CAT_META, CAT_ORDER, Note } from '@/app/data/notes';
import { CatIcon } from './icons';

interface Props {
  note?: Note;
  onSave: (note: { cat: Category; title: string; code: string; desc: string; tags: string[] }) => void;
  onClose: () => void;
}

export function AddNoteModal({ note, onSave, onClose }: Props) {
  const isEdit = !!note;
  const [cat, setCat] = useState<Category>(note?.cat ?? 'git');
  const [title, setTitle] = useState(note?.title ?? '');
  const [code, setCode] = useState(note?.code ?? '');
  const [desc, setDesc] = useState(note?.desc ?? '');
  const [tags, setTags] = useState(note?.tags.join(', ') ?? '');

  const handleSave = () => {
    if (!title.trim()) return;
    onSave({
      cat,
      title: title.trim(),
      code: code.trim(),
      desc: desc.trim(),
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.4)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="bg-white w-full rounded-t-2xl sm:rounded-2xl overflow-y-auto"
        style={{ maxWidth: '520px', maxHeight: '90vh', boxShadow: '0 20px 60px rgba(0,0,0,0.18)' }}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6" style={{ borderBottom: '1px solid rgb(229,229,229)' }}>
          <div>
            <div className="font-bold text-lg" style={{ color: 'rgb(23,23,23)' }}>{isEdit ? 'Edit note' : 'Add new note'}</div>
            <div className="text-sm mt-0.5" style={{ color: 'rgb(115,115,115)' }}>Save a command, shortcut, or tip.</div>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center rounded-lg border-none bg-transparent cursor-pointer"
            style={{ width: 32, height: 32, color: 'rgb(115,115,115)' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-5">

          {/* Title */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold" style={{ color: 'rgb(23,23,23)' }}>Title</label>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder='e.g. "Switch to a branch"'
              className="search-in w-full rounded-lg px-3.5"
              style={{ height: '44px', border: '1px solid rgb(212,212,212)', fontSize: '15px', fontFamily: 'inherit', color: 'rgb(23,23,23)', outline: 'none' }}
            />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold" style={{ color: 'rgb(23,23,23)' }}>Category</label>
            <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(6, 1fr)' }}>
              {CAT_ORDER.map(id => {
                const meta = CAT_META[id];
                const active = cat === id;
                return (
                  <button
                    key={id}
                    onClick={() => setCat(id)}
                    className="flex flex-col items-center justify-center gap-1.5 rounded-xl border cursor-pointer py-3"
                    style={{
                      fontFamily: 'inherit',
                      background: active ? meta.tint : '#fff',
                      border: active ? `2px solid ${meta.color}` : '1px solid rgb(229,229,229)',
                      color: active ? meta.color : 'rgb(82,82,82)',
                    }}
                  >
                    <CatIcon id={id} size={20} />
                    <span className="text-xs font-medium leading-tight text-center" style={{ fontSize: '11px' }}>{meta.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Command */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold" style={{ color: 'rgb(23,23,23)' }}>
              Command / Shortcut <span className="font-normal text-xs" style={{ color: 'rgb(115,115,115)' }}>this is what gets copied</span>
            </label>
            <textarea
              value={code}
              onChange={e => setCode(e.target.value)}
              placeholder="e.g. git checkout dev-AnhTuan"
              rows={3}
              className="w-full rounded-lg px-3.5 py-3 resize-none"
              style={{
                border: '1px solid rgb(212,212,212)',
                fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                fontSize: '14px',
                color: 'rgb(23,23,23)',
                outline: 'none',
                lineHeight: 1.6,
              }}
              onFocus={e => { e.target.style.borderColor = 'rgb(214,187,251)'; e.target.style.boxShadow = '0 0 0 4px rgb(249,245,255)'; }}
              onBlur={e => { e.target.style.borderColor = 'rgb(212,212,212)'; e.target.style.boxShadow = 'none'; }}
            />
          </div>

          {/* Notes */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold" style={{ color: 'rgb(23,23,23)' }}>
              Notes <span className="font-normal text-xs" style={{ color: 'rgb(115,115,115)' }}>optional explanation</span>
            </label>
            <textarea
              value={desc}
              onChange={e => setDesc(e.target.value)}
              placeholder="e.g. Switches you to the dev-AnhTuan branch."
              rows={3}
              className="w-full rounded-lg px-3.5 py-3 resize-none"
              style={{ border: '1px solid rgb(212,212,212)', fontSize: '14px', fontFamily: 'inherit', color: 'rgb(23,23,23)', outline: 'none', lineHeight: 1.6 }}
              onFocus={e => { e.target.style.borderColor = 'rgb(214,187,251)'; e.target.style.boxShadow = '0 0 0 4px rgb(249,245,255)'; }}
              onBlur={e => { e.target.style.borderColor = 'rgb(212,212,212)'; e.target.style.boxShadow = 'none'; }}
            />
          </div>

          {/* Tags */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold" style={{ color: 'rgb(23,23,23)' }}>
              Tags <span className="font-normal text-xs" style={{ color: 'rgb(115,115,115)' }}>comma separated</span>
            </label>
            <input
              value={tags}
              onChange={e => setTags(e.target.value)}
              placeholder="branching, shortcut, command..."
              className="w-full rounded-lg px-3.5"
              style={{ height: '44px', border: '1px solid rgb(212,212,212)', fontSize: '14px', fontFamily: 'inherit', color: 'rgb(23,23,23)', outline: 'none' }}
              onFocus={e => { e.target.style.borderColor = 'rgb(214,187,251)'; e.target.style.boxShadow = '0 0 0 4px rgb(249,245,255)'; }}
              onBlur={e => { e.target.style.borderColor = 'rgb(212,212,212)'; e.target.style.boxShadow = 'none'; }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 pb-6">
          <button
            onClick={handleSave}
            disabled={!title.trim()}
            className="flex-1 rounded-lg font-semibold cursor-pointer border-none"
            style={{
              height: '44px', fontSize: '15px', fontFamily: 'inherit',
              background: title.trim() ? 'rgb(127,86,217)' : 'rgb(214,187,251)',
              color: '#fff',
              cursor: title.trim() ? 'pointer' : 'not-allowed',
            }}
          >
            {isEdit ? 'Save changes' : 'Save note'}
          </button>
          <button
            onClick={onClose}
            className="flex-1 rounded-lg font-semibold cursor-pointer"
            style={{ height: '44px', fontSize: '15px', fontFamily: 'inherit', background: '#fff', border: '1px solid rgb(229,229,229)', color: 'rgb(64,64,64)' }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
