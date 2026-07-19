import { useState } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { Layout } from '@/components/Layout'
import { ColorPicker } from '@/components/ColorPicker'
import { MockSlack } from '@/components/MockSlack'
import { AuthModal } from '@/components/Modal/AuthModal'
import { useThemeStore } from '@/store/themeStore'
import { toSlackPasteString, parseLegacyString } from '@/utils/themeGenerator'
import { insertTheme } from '@/lib/api'
import { useCustomThemeStore } from '@/store/customThemeStore'
import type { ThemeSeeds } from '@/utils/themeGenerator'

const SEED_FIELDS: { field: keyof ThemeSeeds; label: string; description: string }[] = [
  { field: 'column_bg', label: 'Sidebar background', description: 'The main sidebar / nav background color' },
  { field: 'active_item', label: 'Selected item', description: 'Active channel or selected item highlight' },
  { field: 'presence', label: 'Presence', description: 'Online / active status indicator' },
  { field: 'badge', label: 'Notification badge', description: 'Unread counts and mention badges' },
]

export default function Create() {
  const { seeds, derived, setSeed, setSeeds, resetToDefaults } = useThemeStore()
  const { isSignedIn, getToken } = useAuth()
  const addLocalTheme = useCustomThemeStore((s) => s.addTheme)

  const [themeName, setThemeName] = useState('')
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)
  const [savedLocally, setSavedLocally] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const [copied, setCopied] = useState(false)
  const [legacyInput, setLegacyInput] = useState('')
  const [legacyError, setLegacyError] = useState<string | null>(null)

  function handleCopy() {
    navigator.clipboard.writeText(toSlackPasteString(seeds)).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  function handleImportLegacy() {
    const parsed = parseLegacyString(legacyInput)
    if (!parsed) {
      setLegacyError('Could not parse. Expected a comma-separated Slack theme string (8–10 hex values).')
      return
    }
    setLegacyError(null)
    setSeeds(parsed)
    setLegacyInput('')
  }

  function handleSaveLocal() {
    addLocalTheme({ name: themeName.trim() || 'Untitled', mode: 'dark', system: 'seeds', seeds })
    setSavedLocally(true)
    setTimeout(() => setSavedLocally(false), 2000)
  }

  async function handleSave() {
    if (!isSignedIn) {
      setShowAuth(true)
      return
    }

    setSaving(true)
    setSaveError(null)
    try {
      const token = await getToken()
      if (!token) throw new Error('Not signed in')
      await insertTheme(themeName.trim() || 'Untitled', seeds, [], token)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  // Sidebar content: color pickers + actions
  const sidebarContent = (
    <div className="space-y-2 pt-4">
      <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider px-1 mb-3">
        4 Seed colors
      </p>

      {SEED_FIELDS.map(({ field, label, description }) => (
        <ColorPicker
          key={field}
          label={label}
          description={description}
          value={seeds[field]}
          onChange={(hex) => setSeed(field, hex)}
        />
      ))}

      {/* Actions */}
      <div className="pt-3 space-y-2">
        <div className="flex gap-2">
          <input
            value={themeName}
            onChange={(e) => setThemeName(e.target.value)}
            placeholder="Theme name…"
            className="flex-1 min-w-0 px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-xs text-white placeholder:text-neutral-500 outline-none focus:border-neutral-600"
          />
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-xs font-medium rounded-lg transition-colors shrink-0"
          >
            {saved ? '✓ Saved' : saving ? '…' : 'Save'}
          </button>
        </div>
        {saveError && <p className="text-xs text-rose-400">{saveError}</p>}

        <button
          onClick={handleSaveLocal}
          className="w-full py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-medium rounded-lg transition-colors"
        >
          {savedLocally ? '✓ Added to gallery' : 'Add to gallery (no sign-in)'}
        </button>

        <button
          onClick={handleCopy}
          className="w-full py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium rounded-lg transition-colors"
        >
          {copied ? '✓ Copied' : 'Copy theme for Slack'}
        </button>

        <button
          onClick={resetToDefaults}
          className="w-full py-1.5 text-neutral-500 hover:text-neutral-300 text-xs transition-colors"
        >
          Reset to defaults
        </button>
      </div>

      {/* Legacy import */}
      <div className="pt-3 border-t border-neutral-800">
        <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider px-1 mb-2">
          Import legacy theme
        </p>
        <textarea
          rows={2}
          value={legacyInput}
          onChange={(e) => setLegacyInput(e.target.value)}
          placeholder="Paste old comma-separated string…"
          className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-xs text-white placeholder:text-neutral-500 outline-none focus:border-neutral-600 resize-none font-mono"
        />
        {legacyError && <p className="text-xs text-rose-400 mt-1">{legacyError}</p>}
        <button
          onClick={handleImportLegacy}
          disabled={!legacyInput.trim()}
          className="mt-2 w-full py-1.5 bg-neutral-800 hover:bg-neutral-700 disabled:opacity-40 text-neutral-300 text-xs font-medium rounded-lg transition-colors"
        >
          Import
        </button>
      </div>
    </div>
  )

  return (
    <>
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
      <Layout sidebarContent={sidebarContent}>
        <div className="flex flex-col h-full p-6 lg:p-8">
          {/* Page header */}
          <div className="mb-6">
            <h1 className="text-xl font-bold text-neutral-900 dark:text-white">Playground</h1>
            <p className="text-sm text-neutral-500 mt-1">
              Adjust the 4 seed colors. All secondary values are derived automatically.
            </p>
          </div>

          {/* Full-size previewer */}
          <div className="flex-1 min-h-0">
            <MockSlack theme={derived} />
          </div>

          {/* Derived values reference */}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { label: 'Top nav', value: derived.top_nav_bg },
              { label: 'Hover item', value: derived.hover_item },
              { label: 'Text color', value: derived.text_color },
              { label: 'Active item text', value: derived.active_item_text },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                <span className="w-4 h-4 rounded shrink-0 border border-black/10 dark:border-white/10" style={{ backgroundColor: value }} />
                <div className="min-w-0">
                  <p className="text-xs text-neutral-500">{label}</p>
                  <p className="text-xs font-mono text-neutral-700 dark:text-neutral-300 uppercase">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </>
  )
}
