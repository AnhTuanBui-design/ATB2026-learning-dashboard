'use client';

import { useState } from 'react';
import { Note, CAT_META } from '@/app/data/notes';
import { StarIcon } from './icons';

interface Props {
  note: Note;
  onStar: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

function CopyIcon({ copied }: { copied: boolean }) {
  if (copied) return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgb(22,163,74)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5"/>
    </svg>
  );
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="11" height="11" rx="2"/>
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
    </svg>
  );
}

function EditIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4 12.5-12.5z"/>
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
    </svg>
  );
}

export function NoteCard({ note, onStar, onEdit, onDelete }: Props) {
  const meta = CAT_META[note.cat];
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(note.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch { /* clipboard unavailable */ }
  };

  const actionBtn = 'note-action flex items-center justify-center border-none bg-transparent cursor-pointer rounded-md';
  const actionStyle = { width: 28, height: 28, color: 'rgb(115,115,115)' };

  return (
    <div
      className="note-card bg-white rounded-xl p-5 mb-6 break-inside-avoid"
      style={{
        border: '1px solid rgb(229,229,229)',
        borderTop: `4px solid ${meta.color}`,
        boxShadow: '0 1px 2px rgba(16,24,40,0.05)',
      }}
    >
      <div className="flex items-start justify-between gap-2.5">
        <div className="text-base font-semibold leading-snug" style={{ letterSpacing: '-0.01em' }}>
          {note.title}
        </div>
        <div className="note-actions flex items-center gap-0.5 flex-none">
          <button onClick={onStar} className={actionBtn} style={actionStyle} title="Favorite">
            <StarIcon filled={note.fav} />
          </button>
          <button onClick={handleCopy} className={`${actionBtn} note-action-hidden`} style={actionStyle} title="Copy command">
            <CopyIcon copied={copied} />
          </button>
          <button onClick={onEdit} className={`${actionBtn} note-action-hidden`} style={actionStyle} title="Edit">
            <EditIcon />
          </button>
          <button onClick={onDelete} className={`${actionBtn} note-action-hidden`} style={actionStyle} title="Delete">
            <TrashIcon />
          </button>
        </div>
      </div>

      <div
        className="mt-3.5 rounded-lg px-4 py-3"
        style={{
          background: 'rgb(249,250,251)',
          border: '1px solid rgb(237,237,237)',
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: '15px',
          color: 'rgb(23,23,23)',
          wordBreak: 'break-word',
          whiteSpace: 'pre-wrap',
        }}
      >
        {note.code}
      </div>

      <div className="mt-3.5 text-sm leading-relaxed" style={{ color: 'rgb(82,82,82)' }}>
        {note.desc}
      </div>

      <div className="mt-4 flex items-center flex-wrap gap-2">
        <span
          className="inline-flex items-center gap-1.5 text-xs font-semibold rounded-full px-2.5 py-0.5 bg-white"
          style={{ color: meta.color, border: `1px solid ${meta.border}` }}
        >
          <span className="w-1.5 h-1.5 rounded-full flex-none" style={{ background: meta.color }} />
          {meta.name}
        </span>
        {note.tags.map(tag => (
          <span
            key={tag}
            className="text-xs font-medium rounded-full px-2.5 py-0.5 bg-white"
            style={{ color: 'rgb(82,82,82)', border: '1px solid rgb(229,229,229)' }}
          >
            {tag}
          </span>
        ))}
        <span className="ml-auto text-xs whitespace-nowrap" style={{ color: 'rgb(115,115,115)' }}>
          {note.date ?? 'Jun 17'}
        </span>
      </div>
    </div>
  );
}
