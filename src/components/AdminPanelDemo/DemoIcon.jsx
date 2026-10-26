const paths = {
  dashboard: 'M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z',
  items: 'M4 4h16v16H4z M4 9h16 M9 9v11',
  attributes: 'M4 6h16 M4 12h16 M4 18h16 M8 3v6 M16 9v6 M10 15v6',
  blog: 'M14 4H4v16h16V10 M10 14l2-5 6-6 3 3-6 6z',
  leads: 'M3 5h18v14H3z M3 5l9 8 9-8',
  contacts: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8 M17 4a4 4 0 0 1 0 8 M22 21v-2a4 4 0 0 0-3-4',
  planning: 'M4 5h16v16H4z M4 10h16 M8 3v4 M16 3v4',
  quotes: 'M6 3h9l4 4v14H6z M14 3v5h5 M9 12h7 M9 16h7',
  invoicing: 'M6 3h9l4 4v14H6z M14 3v5h5 M15 12h-4v3h4v3h-4 M13 10v10',
  analytics: 'M4 3v17h17 M8 16v-5 M13 16V7 M18 16V4',
  companies: 'M5 21V3h14v18 M9 7h1 M14 7h1 M9 11h1 M14 11h1 M10 21v-5h4v5',
  users: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8 M17 4a4 4 0 0 1 0 8 M22 21v-2a4 4 0 0 0-3-4',
  modules: 'M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M17 14v7 M14 17h7',
  privacy: 'M5 10h14v11H5z M8 10V6a4 4 0 0 1 8 0v4 M12 14v3',
  summary: 'M3 5h18v14H3z M3 5l9 8 9-8',
  profile: 'M20 21a8 8 0 0 0-16 0 M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8',
}
export default function DemoIcon({ name, size = 19 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name] || paths.items} /></svg>
}
