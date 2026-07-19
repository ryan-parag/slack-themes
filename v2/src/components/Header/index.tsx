import type { DerivedTheme } from '@/utils/themeGenerator'

interface HeaderProps {
  onMenuClick: () => void
  theme: DerivedTheme
}

export function Header({ onMenuClick, theme }: HeaderProps) {
  return (
    <header
      className="sticky top-0 z-10 flex items-center h-12 px-4 border-b backdrop-blur-sm lg:hidden"
      style={{ backgroundColor: theme.top_nav_bg, borderColor: theme.contrast_border }}
    >
      <button
        onClick={onMenuClick}
        className="p-1.5 rounded-md hover:opacity-70 transition-opacity"
        style={{ color: theme.top_nav_text }}
        aria-label="Open sidebar"
      >
        <MenuIcon />
      </button>
      <span className="ml-3 font-semibold text-sm" style={{ color: theme.top_nav_text }}>
        Slack Themes
      </span>
    </header>
  )
}

function MenuIcon() {
  return (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  )
}
