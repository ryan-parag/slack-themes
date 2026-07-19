import { useEffect, useState } from 'react'
import { Sidebar } from '@/components/Sidebar'
import { Header } from '@/components/Header'
import { useThemeStore } from '@/store/themeStore'
import { applyTonalRamp } from '@/utils/generateTonalPalette'
import { applyDefaultThemeTokens } from '@/utils/applyDefaultThemeTokens'
import { applyResolvedThemeTokens } from '@/utils/applyResolvedThemeTokens'

interface LayoutProps {
  children: React.ReactNode
  /** Extra content rendered in the app sidebar (e.g. color pickers on the Create page) */
  sidebarContent?: React.ReactNode
}

export function Layout({ children, sidebarContent }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const theme = useThemeStore((s) => s.derived)
  const seeds = useThemeStore((s) => s.seeds)

  // App-chrome gradient ramps — derived from the active theme's seeds so the
  // decorative background shifts to match whatever theme is being edited.
  // Mode follows the OS preference, same as the rest of the app's `dark:` chrome.
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')

    const apply = () => {
      const mode = media.matches ? 'dark' : 'light'
      // Order matters: applyResolvedThemeTokens writes rgba(var(--dt_color-plt-...))
      // references that depend on the --dt_color-plt-gray-* (from
      // applyDefaultThemeTokens) and --dt_color-plt-primary-* (from
      // applyTonalRamp below) custom properties already existing on :root.
      applyDefaultThemeTokens(mode)
      applyTonalRamp('primary', seeds.active_item, mode)
      applyTonalRamp('highlight1', seeds.presence, mode)
      applyResolvedThemeTokens(mode)
    }

    apply()
    media.addEventListener('change', apply)
    return () => media.removeEventListener('change', apply)
  }, [seeds.active_item, seeds.presence])

  return (
    <div
      className="flex items-center justify-center w-full min-h-dvh p-4 lg:p-8"
      style={{
        background:
          'radial-gradient(circle at 50% 50%, rgb(var(--dt_color-plt-primary-5)) 20%, transparent 80%), ' +
          'conic-gradient(from 45deg at 50% 50%, rgb(var(--dt_color-plt-highlight1-0)) 0%, rgb(var(--dt_color-plt-primary-5)) 25%, rgb(var(--dt_color-plt-highlight1-0)) 50%, rgb(var(--dt_color-plt-primary-5)) 75%, rgb(var(--dt_color-plt-highlight1-0)) 100%)',
      }}
    >
      <div className="relative flex w-full h-[calc(100dvh-2rem)] lg:h-[calc(100dvh-4rem)] max-w-400 overflow-hidden rounded-2xl shadow-2xl bg-white dark:bg-neutral-950">
        {/* Mobile overlay */}
        {mobileOpen && (
          <div
            className="absolute inset-0 bg-black/40 z-20 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* App sidebar — reskinned live to match the active theme */}
        <aside
          className={[
            'absolute top-0 left-0 h-full w-64 z-30 flex flex-col border-r',
            'transition-transform duration-200',
            mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          ].join(' ')}
          style={{ background: theme.column_bg, borderColor: theme.contrast_border }}
        >
          <Sidebar onClose={() => setMobileOpen(false)} extraContent={sidebarContent} />
        </aside>

        {/* Main content */}
        <div className="flex flex-col flex-1 lg:pl-64 min-w-0 overflow-y-auto">
          <Header onMenuClick={() => setMobileOpen(true)} theme={theme} />
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  )
}
