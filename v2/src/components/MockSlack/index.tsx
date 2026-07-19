import type { DerivedTheme } from '@/utils/themeGenerator'

interface MockSlackProps {
  theme: DerivedTheme
  /** compact mode for theme browse cards */
  compact?: boolean
}

const CHANNELS = ['general', 'design', 'engineering', 'random']
const ACTIVE_CHANNEL = 'design'

const MESSAGES = [
  { id: 1, name: 'Alex', avatar: 'A', text: 'Just pushed the new color system — check it out!', time: '10:24 AM' },
  { id: 2, name: 'Jordan', avatar: 'J', text: 'Looks great. The contrast ratios are much better now 🎨', time: '10:26 AM' },
  { id: 3, name: 'Sam', avatar: 'S', text: 'Shipping to prod at 3pm if no objections', time: '10:31 AM' },
]

export function MockSlack({ theme, compact = false }: MockSlackProps) {
  if (compact) return <CompactMockSlack theme={theme} />

  return (
    <div
      className="flex rounded-xl overflow-hidden border border-white/10 shadow-2xl select-none"
      style={{ height: 480 }}
    >
      {/* Left sidebar */}
      <div
        className="flex flex-col w-56 shrink-0"
        style={{ backgroundColor: theme.column_bg }}
      >
        {/* Top nav / workspace header */}
        <div
          className="flex items-center justify-between px-3 h-11 shrink-0 border-b"
          style={{
            backgroundColor: theme.top_nav_bg,
            borderColor: theme.contrast_border,
          }}
        >
          <div className="flex items-center gap-2 min-w-0">
            <div
              className="w-5 h-5 rounded shrink-0 flex items-center justify-center"
              style={{ backgroundColor: theme.active_item }}
            >
              <span style={{ color: theme.active_item_text, fontSize: 10, fontWeight: 700 }}>S</span>
            </div>
            <span
              className="text-sm font-semibold truncate"
              style={{ color: theme.top_nav_text }}
            >
              Slack Themes
            </span>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
            style={{ color: theme.top_nav_text, opacity: 0.7, flexShrink: 0 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487z" />
          </svg>
        </div>

        {/* Search bar */}
        <div className="px-2 pt-2 pb-1">
          <div
            className="flex items-center gap-1.5 px-2 h-7 rounded"
            style={{ backgroundColor: theme.hover_item }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
              style={{ color: theme.text_color, opacity: 0.6 }}>
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <span className="text-xs" style={{ color: theme.text_muted }}>Search</span>
          </div>
        </div>

        {/* Channels section */}
        <div className="flex-1 overflow-hidden pt-1">
          <div
            className="px-3 py-1 text-xs font-semibold uppercase tracking-wider mb-0.5"
            style={{ color: theme.text_muted }}
          >
            Channels
          </div>
          {CHANNELS.map((channel) => {
            const isActive = channel === ACTIVE_CHANNEL
            return (
              <div
                key={channel}
                className="flex items-center gap-2 mx-1 px-2 py-1 rounded text-sm"
                style={{
                  backgroundColor: isActive ? theme.active_item : 'transparent',
                  color: isActive ? theme.active_item_text : theme.text_color,
                }}
              >
                <span style={{ opacity: isActive ? 1 : 0.6 }}>#</span>
                <span className="truncate">{channel}</span>
                {channel === 'general' && (
                  <span
                    className="ml-auto text-xs font-semibold min-w-[18px] h-[18px] flex items-center justify-center rounded-full px-1"
                    style={{ backgroundColor: theme.mention_badge, color: '#fff' }}
                  >
                    3
                  </span>
                )}
              </div>
            )
          })}

          {/* Direct messages */}
          <div
            className="px-3 py-1 text-xs font-semibold uppercase tracking-wider mt-2 mb-0.5"
            style={{ color: theme.text_muted }}
          >
            Direct Messages
          </div>
          {['Alex', 'Jordan', 'Sam'].map((name, i) => (
            <div
              key={name}
              className="flex items-center gap-2 mx-1 px-2 py-1 rounded text-sm"
              style={{ color: theme.text_color }}
            >
              <div className="relative shrink-0">
                <div
                  className="w-4 h-4 rounded-sm flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: ['#e8912d', '#1164a3', '#2bac76'][i] }}
                >
                  {name[0]}
                </div>
                {i < 2 && (
                  <div
                    className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: theme.presence,
                      boxShadow: `0 0 0 1.5px ${theme.column_bg}`,
                    }}
                  />
                )}
              </div>
              <span className="truncate text-xs">{name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex flex-col flex-1 bg-white dark:bg-neutral-900 min-w-0">
        <div className="flex items-center gap-2 px-4 h-11 border-b border-neutral-200 dark:border-neutral-800 shrink-0">
          <span className="text-neutral-400">#</span>
          <span className="font-semibold text-sm text-neutral-900 dark:text-white">design</span>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
          {MESSAGES.map((msg) => (
            <div key={msg.id} className="flex gap-3">
              <div
                className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center text-white text-sm font-bold"
                style={{ backgroundColor: ['#e8912d', '#1164a3', '#2bac76'][msg.id - 1] }}
              >
                {msg.avatar}
              </div>
              <div className="min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-semibold text-neutral-900 dark:text-white">{msg.name}</span>
                  <span className="text-xs text-neutral-400">{msg.time}</span>
                </div>
                <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="px-4 pb-4 shrink-0">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800">
            <span className="text-xs text-neutral-400 flex-1">Message #design</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
              className="text-neutral-400 shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Compact variant for browse cards ────────────────────────────────────────

function CompactMockSlack({ theme }: { theme: DerivedTheme }) {
  return (
    <div
      className="flex overflow-hidden rounded-lg"
      style={{ height: 88 }}
    >
      {/* Mini sidebar */}
      <div
        className="flex flex-col w-24 shrink-0"
        style={{ backgroundColor: theme.column_bg }}
      >
        {/* Top nav strip */}
        <div
          className="h-5 shrink-0"
          style={{ backgroundColor: theme.top_nav_bg }}
        />
        {/* Channels */}
        <div className="flex-1 px-1.5 py-1 space-y-0.5">
          {CHANNELS.slice(0, 3).map((ch) => {
            const isActive = ch === ACTIVE_CHANNEL
            return (
              <div
                key={ch}
                className="flex items-center gap-1 px-1 py-0.5 rounded text-xs"
                style={{
                  backgroundColor: isActive ? theme.active_item : 'transparent',
                  color: isActive ? theme.active_item_text : theme.text_color,
                  opacity: isActive ? 1 : 0.7,
                }}
              >
                <span style={{ fontSize: 8 }}>#</span>
                <span className="truncate" style={{ fontSize: 9 }}>{ch}</span>
                {ch === 'general' && (
                  <span
                    className="ml-auto font-bold"
                    style={{ fontSize: 8, color: theme.mention_badge }}
                  >
                    3
                  </span>
                )}
              </div>
            )
          })}
          {/* Presence dot */}
          <div className="flex items-center gap-1 px-1 py-0.5">
            <div
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ backgroundColor: theme.presence }}
            />
            <span style={{ fontSize: 9, color: theme.text_muted }}>Alex</span>
          </div>
        </div>
      </div>

      {/* Mini chat */}
      <div className="flex-1 bg-white dark:bg-neutral-900 p-1.5 space-y-1">
        {MESSAGES.slice(0, 2).map((msg) => (
          <div key={msg.id} className="flex gap-1 items-start">
            <div
              className="w-3.5 h-3.5 rounded shrink-0 flex items-center justify-center text-white"
              style={{ backgroundColor: ['#e8912d', '#1164a3', '#2bac76'][msg.id - 1], fontSize: 7, fontWeight: 700 }}
            >
              {msg.avatar}
            </div>
            <p className="text-neutral-600 dark:text-neutral-300 leading-tight line-clamp-2" style={{ fontSize: 9 }}>
              <span className="font-semibold text-neutral-900 dark:text-white">{msg.name} </span>
              {msg.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
