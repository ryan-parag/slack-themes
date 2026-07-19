import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useUser, useClerk } from '@clerk/clerk-react'
import { useThemeStore } from '@/store/themeStore'
import type { DerivedTheme } from '@/utils/themeGenerator'

interface SidebarProps {
  onClose: () => void
  extraContent?: React.ReactNode
}

const NAV_LINKS = [
  { to: '/', label: 'Explore', icon: GridIcon },
  { to: '/create', label: 'Playground', icon: PenIcon },
  { to: '/theme-gallery', label: 'Slack Presets', icon: GridIcon },
  { to: '/about', label: 'About', icon: InfoIcon },
]

export function Sidebar({ onClose, extraContent }: SidebarProps) {
  const { user } = useUser()
  const { signOut } = useClerk()
  const theme = useThemeStore((s) => s.derived)

  return (
    <div className="flex flex-col h-full min-h-0 relative">
      <div
        className="absolute top-0 bottom-0 left-0 right-0 -z-10 user-select-none"
        style={{
          backgroundColor: 'var(--dt_color-theme-surf-inv-sec)'
        }}
      />
      {/* Workspace top bar — mimics Slack's top nav */}
      <div
        className="flex items-center justify-between px-4 h-12 shrink-0 border-b"
        style={{ backgroundColor: theme.top_nav_bg, borderColor: theme.contrast_border }}
      >
        <NavLink to="/" onClick={onClose} className="flex items-center gap-2 min-w-0">
          <SlackThemesLogo bg={theme.active_item} fg={theme.active_item_text} />
          <span
            className="font-semibold text-sm tracking-tight truncate"
            style={{ color: theme.top_nav_text }}
          >
            Slack Themes
          </span>
        </NavLink>
        <button
          onClick={onClose}
          className="lg:hidden p-1 rounded shrink-0"
          style={{ color: theme.top_nav_text }}
          aria-label="Close sidebar"
        >
          <XIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Nav — styled like Slack's channel list */}
      <nav className="px-2 pt-3 pb-1 space-y-0.5 shrink-0">
        <p
          className="px-2.5 pb-1 text-[11px] font-semibold uppercase tracking-wider"
          style={{ color: theme.text_muted }}
        >
          Menu
        </p>
        {NAV_LINKS.map(({ to, label, icon: Icon }) => (
          <NavRow key={to} to={to} label={label} Icon={Icon} theme={theme} onClose={onClose} />
        ))}
      </nav>

      {/* Extra content (e.g. color pickers on /create) — scrollable middle zone */}
      {extraContent && (
        <div
          className="flex-1 overflow-y-auto px-4 pb-4 mt-2 min-h-0 border-t"
          style={{ borderColor: theme.contrast_border }}
        >
          {extraContent}
        </div>
      )}

      {/* Auth — always pinned to bottom */}
      <div
        className="px-4 py-3 border-t shrink-0 mt-auto"
        style={{ borderColor: theme.contrast_border }}
      >
        {user ? (
          <div className="flex items-center gap-2">
            <div className="relative shrink-0">
              <div
                className="w-7 h-7 rounded flex items-center justify-center text-xs font-bold"
                style={{ backgroundColor: theme.active_item, color: theme.active_item_text }}
              >
                {(user.primaryEmailAddress?.emailAddress ?? '?')[0]?.toUpperCase()}
              </div>
              <div
                className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full"
                style={{ backgroundColor: theme.presence, boxShadow: `0 0 0 1.5px ${theme.column_bg}` }}
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs truncate" style={{ color: theme.text_color }}>
                {user.primaryEmailAddress?.emailAddress}
              </p>
              <button
                onClick={() => signOut()}
                className="text-xs transition-opacity hover:opacity-100"
                style={{ color: theme.text_muted }}
              >
                Sign out
              </button>
            </div>
          </div>
        ) : (
          <p className="text-xs" style={{ color: theme.text_muted }}>
            Sign in to save themes
          </p>
        )}
      </div>
    </div>
  )
}

// ─── Nav row with theme-aware hover state ────────────────────────────────────

function NavRow({
  to,
  label,
  Icon,
  theme,
  onClose,
}: {
  to: string
  label: string
  Icon: (props: { className?: string; style?: React.CSSProperties }) => React.ReactElement
  theme: DerivedTheme
  onClose: () => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <NavLink
      to={to}
      end={to === '/'}
      onClick={onClose}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-3 px-2.5 py-1.5 rounded-md text-sm font-medium transition-colors"
    >
      {({ isActive }) => (
        <div
          className="flex items-center gap-3 -mx-2.5 -my-1.5 px-2.5 py-1.5 rounded-md w-[calc(100%+20px)]"
          style={{
            backgroundColor: isActive ? theme.active_item : hovered ? theme.hover_item : 'transparent',
            color: isActive ? theme.active_item_text : theme.text_color,
          }}
        >
          <Icon className="w-4 h-4 shrink-0" style={{ opacity: isActive ? 1 : 0.75 }} />
          <span>{label}</span>
        </div>
      )}
    </NavLink>
  )
}

// ─── Inline SVG icons (zero-dep, sized via className) ────────────────────────

function GridIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
  )
}

function PenIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
  )
}

function InfoIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
  )
}

function SearchIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <circle cx="11" cy="11" r="8" />
      <path strokeLinecap="round" d="m21 21-4.35-4.35" />
    </svg>
  )
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

function SlackThemesLogo({ bg, fg }: { bg: string; fg: string }) {
  return (
    <div
      className="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
      style={{ backgroundColor: bg }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill={fg}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
      </svg>
    </div>
  )
}
