'use client';

import { Category, CAT_META, CAT_ORDER } from '@/app/data/notes';
import { CatIcon, HomeIcon, SearchIcon } from './icons';

interface SidebarProps {
  activeCat: Category | 'all';
  counts: Record<string, number>;
  total: number;
  onSelect: (cat: Category | 'all') => void;
}

export function Sidebar({ activeCat, counts, total, onSelect }: SidebarProps) {
  return (
    <aside
      className="flex-none h-full flex flex-col"
      style={{
        width: '284px',
        borderRight: '1px solid rgb(229,229,229)',
        background: '#fff',
        padding: '22px 16px 20px',
      }}
    >
      {/* Workspace header */}
      <div className="flex items-center justify-between" style={{ padding: '0 8px 22px' }}>
        <span className="font-bold" style={{ fontSize: '19px', letterSpacing: '-0.02em' }}>AnhTuan</span>
        <button
          className="icon-btn flex items-center justify-center border-none bg-transparent rounded-lg cursor-pointer"
          style={{ width: 30, height: 30, color: 'rgb(115,115,115)' }}
        >
          <SearchIcon size={18} />
        </button>
      </div>

      {/* Overview */}
      <div className="text-xs font-semibold uppercase" style={{ letterSpacing: '0.06em', color: 'rgb(115,115,115)', padding: '0 10px 8px' }}>
        OVERVIEW
      </div>
      <button
        onClick={() => onSelect('all')}
        className="row-hover flex items-center gap-3 rounded-lg cursor-pointer border-none text-left w-full"
        style={{
          padding: '8px 10px',
          fontSize: '15px',
          fontWeight: activeCat === 'all' ? 600 : 500,
          background: activeCat === 'all' ? 'rgb(245,245,245)' : 'transparent',
          color: activeCat === 'all' ? 'rgb(23,23,23)' : 'rgb(64,64,64)',
        }}
      >
        <span className="flex-none"><HomeIcon /></span>
        <span className="flex-1">All Notes</span>
        <span
          className="text-xs font-semibold rounded-full bg-white flex-none text-center"
          style={{ color: 'rgb(64,64,64)', border: '1px solid rgb(212,212,212)', padding: '1px 9px', minWidth: '24px' }}
        >
          {total}
        </span>
      </button>

      {/* Categories */}
      <div className="text-xs font-semibold uppercase" style={{ letterSpacing: '0.06em', color: 'rgb(115,115,115)', padding: '18px 10px 8px' }}>
        CATEGORIES
      </div>
      <nav className="flex flex-col gap-0.5">
        {CAT_ORDER.map(id => {
          const meta = CAT_META[id];
          const active = activeCat === id;
          return (
            <button
              key={id}
              onClick={() => onSelect(id)}
              className="row-hover flex items-center gap-3 rounded-lg cursor-pointer border-none text-left w-full"
              style={{
                padding: '8px 10px',
                fontSize: '15px',
                fontWeight: active ? 600 : 500,
                background: active ? 'rgb(245,245,245)' : 'transparent',
                color: active ? 'rgb(23,23,23)' : 'rgb(64,64,64)',
              }}
            >
              <span className="flex-none" style={{ color: meta.color }}><CatIcon id={id} /></span>
              <span className="flex-1">{meta.name}</span>
              <span
                className="text-xs font-semibold rounded-full bg-white flex-none text-center"
                style={{ color: meta.color, border: `1px solid ${meta.border}`, padding: '1px 9px', minWidth: '24px' }}
              >
                {counts[id] ?? 0}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
