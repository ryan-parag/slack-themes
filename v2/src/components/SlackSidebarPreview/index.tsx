import { resolveThemeToken } from '@/utils/resolveThemeToken'
import { DEFAULT_PALETTES } from '@/utils/slackDesignTokens'

// Flat palette shape returned by utils/resolveSlackTheme.ts
export interface ResolvedSlackTheme {
  column_bg: string
  menu_bg: string
  active_item: string
  active_item_text: string
  hover_item: string
  text_color: string
  active_presence: string
  badge: string
  badge_text_color?: string
  top_nav_bg?: string
  top_nav_text?: string
}

interface SlackSidebarPreviewProps {
  theme: ResolvedSlackTheme
  /** compact mode for gallery/grid cards */
  compact?: boolean
  /**
   * When supplied, layers the design-tokens "surf-inv-sec" translucent
   * overlay on top of column_bg (resolveThemeToken), scoped to this mode.
   * Only meaningful for dynamic (design-token) themes — omit for classic
   * themes, which don't use the dt_ token system.
   */
  mode?: 'light' | 'dark'
}

const CHANNELS = ['general', 'design', 'random']
const ACTIVE_CHANNEL = 'design'
const DMS = ['Alex', 'Jordan', 'Sam']

/**
 * Read-only mock of a Slack sidebar rendered with a resolved theme palette.
 * Purely presentational — all state (which theme, which mode) lives in the
 * page that renders it.
 */
export function SlackSidebarPreview({ theme, compact = false, mode }: SlackSidebarPreviewProps) {
  if (compact) return <CompactSlackSidebarPreview theme={theme} />

  const topNavBg = theme.top_nav_bg ?? theme.menu_bg
  const topNavText = theme.top_nav_text ?? theme.text_color
  const badgeText = theme.badge_text_color ?? '#FFFFFF'

  // "--dt_color-plt-gray-0" is declared locally (rather than relying on the
  // document-level value applyDefaultThemeTokens sets) so this resolves
  // correctly for whichever mode is being previewed here, independent of
  // the app chrome's own (OS-scheme-driven) custom properties.
  const surfInvSecOverlay = mode ? resolveThemeToken({ tokenName: 'surf-inv-sec', mode }) : undefined

  return (
    <div
      className="relative flex flex-col w-56 shrink-0 h-full rounded-xl overflow-hidden border border-white/10 shadow-2xl select-none"
      style={{
        backgroundColor: theme.column_bg,
        ...(mode === 'dark'
          ? ({ '--dt_color-plt-gray-0': DEFAULT_PALETTES.dark.gray['0'] } as React.CSSProperties)
          : {}),
        // Actually set the semantic custom property (mirrors how
        // Sidebar.tsx already consumes --dt_color-theme-surf-inv-sec),
        // rather than only baking its resolved value into the overlay's
        // backgroundColor below.
        ...(surfInvSecOverlay
          ? ({ '--dt_color-theme-surf-inv-sec': surfInvSecOverlay } as React.CSSProperties)
          : {}),
      }}
    >
      {surfInvSecOverlay && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundColor: 'var(--dt_color-theme-surf-inv-sec)' }}
        />
      )}

      <div className="relative flex flex-col flex-1 min-h-0">
      {/* Top nav / workspace menu */}
      <div
        className="flex items-center px-3 h-11 shrink-0"
        style={{ backgroundColor: topNavBg }}
      >
        <span className="text-sm font-semibold truncate" style={{ color: topNavText }}>
          Workspace
        </span>
      </div>

      {/* Channels + DMs */}
      <div className="flex-1 overflow-hidden pt-2 pb-2">
        <div
          className="px-3 pb-1 text-xs font-semibold uppercase tracking-wider"
          style={{ color: theme.text_color, opacity: 0.6 }}
        >
          Channels
        </div>
        {CHANNELS.map((channel) => {
          const isActive = channel === ACTIVE_CHANNEL
          return (
            <div
              key={channel}
              className="flex items-center gap-2 mx-2 px-2 py-1 rounded text-sm"
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
                  style={{ backgroundColor: theme.badge, color: badgeText }}
                >
                  3
                </span>
              )}
            </div>
          )
        })}

        <div
          className="px-3 pt-3 pb-1 text-xs font-semibold uppercase tracking-wider"
          style={{ color: theme.text_color, opacity: 0.6 }}
        >
          Direct Messages
        </div>
        {DMS.map((name, i) => (
          <div
            key={name}
            className="flex items-center gap-2 mx-2 px-2 py-1 rounded text-sm"
            style={{ color: theme.text_color }}
          >
            <div className="relative shrink-0">
              <div
                className="w-4 h-4 rounded-sm flex items-center justify-center text-white text-xs font-bold"
                style={{ backgroundColor: theme.hover_item }}
              >
                {name[0]}
              </div>
              {i < 2 && (
                <div
                  className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: theme.active_presence,
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
    </div>
  )
}

// ─── Compact variant for gallery cards ───────────────────────────────────────

function CompactSlackSidebarPreview({ theme }: { theme: ResolvedSlackTheme }) {
  const topNavBg = theme.top_nav_bg ?? theme.menu_bg

  return (
    <div
      className="flex flex-col w-full rounded-lg overflow-hidden"
      style={{ backgroundColor: theme.column_bg, height: 96 }}
    >
      <div className="h-5 shrink-0" style={{ backgroundColor: topNavBg }} />
      <div className="flex-1 px-2 py-1.5 space-y-0.5">
        {CHANNELS.map((channel) => {
          const isActive = channel === ACTIVE_CHANNEL
          return (
            <div
              key={channel}
              className="flex items-center gap-1 px-1 py-0.5 rounded text-xs"
              style={{
                backgroundColor: isActive ? theme.active_item : 'transparent',
                color: isActive ? theme.active_item_text : theme.text_color,
                opacity: isActive ? 1 : 0.75,
              }}
            >
              <span style={{ fontSize: 8 }}>#</span>
              <span className="truncate" style={{ fontSize: 9 }}>{channel}</span>
              {channel === 'general' && (
                <span className="ml-auto font-bold" style={{ fontSize: 8, color: theme.badge }}>
                  3
                </span>
              )}
            </div>
          )
        })}
        <div className="flex items-center gap-1 px-1 py-0.5">
          <div
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{ backgroundColor: theme.active_presence }}
          />
          <span style={{ fontSize: 9, color: theme.text_color, opacity: 0.8 }}>Alex</span>
        </div>
      </div>
    </div>
  )
}
