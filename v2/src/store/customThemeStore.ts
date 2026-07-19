import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ThemeSeeds } from '@/utils/themeGenerator'

// The 8 fields a fully-custom Slack theme needs — mirrors CUSTOM_KEYS in
// utils/resolveSlackTheme.ts.
export interface CustomThemeValues {
  column_bg: string
  menu_bg: string
  active_item: string
  active_item_text: string
  hover_item: string
  text_color: string
  active_presence: string
  badge: string
}

/** Which color-input system produced a saved theme's data. */
export type ThemeSystem = 'classic' | 'dynamic' | 'seeds'

export interface SavedCustomTheme {
  id: string
  name: string
  system: ThemeSystem
  customValues?: CustomThemeValues // present when system === 'classic'
  seedColor?: string // present when system === 'dynamic'
  seeds?: ThemeSeeds // present when system === 'seeds' (Playground's 4-anchor model)
  mode: 'light' | 'dark'
  createdAt: number
}

type NewCustomTheme =
  | { name: string; mode: 'light' | 'dark'; system: 'classic'; customValues: CustomThemeValues }
  | { name: string; mode: 'light' | 'dark'; system: 'dynamic'; seedColor: string }
  | { name: string; mode: 'light' | 'dark'; system: 'seeds'; seeds: ThemeSeeds }

interface CustomThemeState {
  themes: SavedCustomTheme[]
  addTheme: (theme: NewCustomTheme) => SavedCustomTheme
  removeTheme: (id: string) => void
}

/**
 * Persistence for user-created custom Slack themes (the 8-field model used
 * by utils/resolveSlackTheme). Backed by localStorage via zustand's persist
 * middleware for now — swapping in a real backend later just means
 * replacing the addTheme/removeTheme bodies with API calls and dropping
 * the persist() wrapper; callers don't change.
 */
export const useCustomThemeStore = create<CustomThemeState>()(
  persist(
    (set, get) => ({
      themes: [],

      addTheme: (theme) => {
        const saved: SavedCustomTheme = {
          id: crypto.randomUUID(),
          createdAt: Date.now(),
          ...theme,
        }
        set({ themes: [saved, ...get().themes] })
        return saved
      },

      removeTheme: (id) =>
        set({ themes: get().themes.filter((t) => t.id !== id) }),
    }),
    { name: 'slack-themes:custom-themes' }
  )
)
