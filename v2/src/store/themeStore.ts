import { create } from 'zustand'
import {
  generateTheme,
  DEFAULT_SEEDS,
  type ThemeSeeds,
  type DerivedTheme,
} from '@/utils/themeGenerator'

interface ThemeState {
  seeds: ThemeSeeds
  derived: DerivedTheme
  setSeed: (field: keyof ThemeSeeds, value: string) => void
  setSeeds: (seeds: ThemeSeeds) => void
  resetToDefaults: () => void
}

export const useThemeStore = create<ThemeState>((set) => ({
  seeds: DEFAULT_SEEDS,
  derived: generateTheme(DEFAULT_SEEDS),

  setSeed: (field, value) =>
    set((state) => {
      const next = { ...state.seeds, [field]: value }
      return { seeds: next, derived: generateTheme(next) }
    }),

  setSeeds: (seeds) =>
    set({ seeds, derived: generateTheme(seeds) }),

  resetToDefaults: () =>
    set({ seeds: DEFAULT_SEEDS, derived: generateTheme(DEFAULT_SEEDS) }),
}))
