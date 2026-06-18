'use client';

import { Note, CAT_META } from '@/app/data/notes';
import { StarIcon } from './icons';

export function NoteCard({ note, onStar }: { note: Note; onStar: () => void }) {
  const meta = CAT_META[note.cat];
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
        <button onClick={onStar} className="border-none bg-transparent cursor-pointer p-0.5 flex-none flex leading-none">
          <StarIcon filled={note.fav} />
        </button>
      </div>

      <div
        className="mt-3.5 rounded-lg px-4 py-3 text-sm"
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
