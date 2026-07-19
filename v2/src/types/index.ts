import type { ThemeSeeds, DerivedTheme } from '@/utils/themeGenerator'

export type { ThemeSeeds, DerivedTheme }

// A theme record as stored in / returned from the themes API
export interface ThemeRecord {
  id: string
  user_id: string | null
  name: string
  colors: ThemeSeeds          // JSON-serialized column — the 4 seed values
  is_public: boolean
  likes: number
  created_at: string
  groups: string[]
}
