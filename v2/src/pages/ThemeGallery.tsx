import { useMemo, useState } from 'react'
import { Layout } from '@/components/Layout'
import { ModeToggle } from '@/components/ModeToggle'
import { SlackSidebarPreview } from '@/components/SlackSidebarPreview'
import type { ResolvedSlackTheme } from '@/components/SlackSidebarPreview'
import { resolveSlackTheme } from '@/utils/resolveSlackTheme'
import { ThemeMode, ThemeName, THEME_LABELS, LIGHT_PRESETS, DARK_PRESETS } from '@/utils/slackThemePresets'
import { joinSlackThemeValues } from '@/utils/themeGenerator'
import { generateTonalRamp } from '@/utils/generateTonalPalette'
import { mapRampToSidebarPreview } from '@/utils/dynamicSidebarPreview'
import { DEFAULT_PALETTES, PALETTE_NAMES } from '@/utils/slackDesignTokens'
import { generateTheme } from '@/utils/themeGenerator'
import { useCustomThemeStore } from '@/store/customThemeStore'

// Same field order Slack's own paste format (and parseLegacyString) uses.
function toSlackPasteString(theme: ResolvedSlackTheme): string {
  return joinSlackThemeValues([
    theme.column_bg,
    theme.menu_bg,
    theme.active_item,
    theme.active_item_text,
    theme.hover_item,
    theme.text_color,
    theme.active_presence,
    theme.badge,
    theme.top_nav_bg ?? theme.menu_bg,
    theme.top_nav_text ?? theme.text_color,
  ])
}

export default function ThemeGallery() {
  const [mode, setMode] = useState<'light' | 'dark'>('dark')
  const customThemes = useCustomThemeStore((s) => s.themes)
  const removeTheme = useCustomThemeStore((s) => s.removeTheme)

  // Built-in preset names available in the current mode, deduped against
  // whatever renders identically to the default theme (e.g. AUBERGINE_BRIGHT).
  const presetNames = useMemo(() => {
    const presets = mode === 'dark' ? DARK_PRESETS : LIGHT_PRESETS
    const defaultJSON = JSON.stringify(presets[ThemeName.DEFAULT])
    const seen = new Set<string>()

    return Object.values(ThemeName).filter((name) => {
      const palette = presets[name as keyof typeof presets]
      if (!palette) return false // light-only presets (Cotton/Eco) have no dark variant
      const json = JSON.stringify(palette)
      if (name !== ThemeName.DEFAULT && json === defaultJSON) return false
      if (seen.has(json)) return false
      seen.add(json)
      return true
    })
  }, [mode])

  return (
    <Layout>
      <div className="p-6 lg:p-8">
        {/* Page header */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-neutral-900 dark:text-white">Theme Gallery</h1>
            <p className="text-sm text-neutral-500 mt-1">
              Slack's built-in presets, plus themes you've created.
            </p>
          </div>
          <ModeToggle mode={mode} onChange={setMode} />
        </div>

        {customThemes.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
              Your themes
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
              {customThemes.map((t) => (
                <GalleryCard
                  key={t.id}
                  title={t.name}
                  theme={
                    t.system === 'seeds' && t.seeds
                      ? (() => {
                          const derived = generateTheme(t.seeds)
                          return {
                            column_bg: derived.column_bg,
                            menu_bg: derived.top_nav_bg,
                            active_item: derived.active_item,
                            active_item_text: derived.active_item_text,
                            hover_item: derived.hover_item,
                            text_color: derived.text_color,
                            active_presence: derived.active_presence,
                            badge: derived.mention_badge,
                            top_nav_bg: derived.top_nav_bg,
                            top_nav_text: derived.top_nav_text,
                          }
                        })()
                      : t.system === 'dynamic' && t.seedColor
                      ? mapRampToSidebarPreview(generateTonalRamp(t.seedColor, mode))
                      : resolveSlackTheme({
                          mode,
                          themeMode: ThemeMode.CUSTOM,
                          customValues: t.customValues,
                        })
                  }
                  onRemove={() => removeTheme(t.id)}
                />
              ))}
            </div>
          </section>
        )}

        <section className="mb-8">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
            Slack presets
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {presetNames.map((name) => (
              <GalleryCard
                key={name}
                title={THEME_LABELS[name as keyof typeof THEME_LABELS] ?? name}
                theme={resolveSlackTheme({ mode, themeName: name })}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
            Dynamic accent palettes
          </h2>
          <p className="text-xs text-neutral-500 mb-3 -mt-2">
            Slack's built-in tonal palettes — use one as a starting seed color in the Playground.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {PALETTE_NAMES.map((name) => (
              <GalleryCard
                key={name}
                title={name.charAt(0).toUpperCase() + name.slice(1)}
                theme={mapRampToSidebarPreview(DEFAULT_PALETTES[mode][name])}
              />
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}

function GalleryCard({
  title,
  theme,
  onRemove,
}: {
  title: string
  theme: ResolvedSlackTheme
  onRemove?: () => void
}) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(toSlackPasteString(theme)).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="group flex flex-col rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors">
      <div className="p-2 bg-neutral-50 dark:bg-neutral-950">
        <SlackSidebarPreview theme={theme} compact />
      </div>
      <div className="flex items-center gap-2 px-3 py-2.5">
        <span className="flex-1 text-xs font-medium text-neutral-700 dark:text-neutral-300 truncate">
          {title}
        </span>
        <button
          onClick={handleCopy}
          className="px-1.5 py-1 rounded text-xs text-neutral-400 hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          title="Copy theme (paste into Slack)"
        >
          {copied ? '✓' : 'Copy'}
        </button>
        {onRemove && (
          <button
            onClick={onRemove}
            className="p-1.5 rounded text-neutral-400 hover:text-rose-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-xs"
            title="Remove theme"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  )
}
