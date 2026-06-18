import { Category } from '@/app/data/notes';

export function CatIcon({ id, size = 18 }: { id: Category; size?: number }) {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  if (id === 'git') return (
    <svg {...p}><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9a6 6 0 01-6 6H6"/></svg>
  );
  if (id === 'vscode') return (
    <svg {...p}><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/></svg>
  );
  if (id === 'claude') return (
    <svg {...p}><path d="M12 2.5v19M2.5 12h19M5.4 5.4l13.2 13.2M18.6 5.4L5.4 18.6"/></svg>
  );
  if (id === 'netlify') return (
    <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a15 15 0 010 18a15 15 0 010-18"/></svg>
  );
  if (id === 'supabase') return (
    <svg {...p}><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5"/><path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"/></svg>
  );
  return (
    <svg {...p}><path d="M4 19.5A2.5 2.5 0 016.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>
  );
}

export function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? 'rgb(250,204,21)' : 'none'}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        stroke={filled ? 'rgb(234,179,8)' : 'rgb(209,213,219)'} strokeWidth="1.6" strokeLinejoin="round"/>
    </svg>
  );
}

export function SearchIcon({ size = 20, color = 'rgb(115,115,115)' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke={color} strokeWidth="2"/>
      <path d="M21 21l-4-4" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export function HomeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M3 10.5L12 3l9 7.5M5 9.5V20h14V9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function PlusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M12 5v14M5 12h14" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"/>
    </svg>
  );
}
