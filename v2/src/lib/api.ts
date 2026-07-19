import type { ThemeSeeds } from '@/utils/themeGenerator'

export interface ThemeRow {
  id: string
  user_id: string | null
  name: string
  colors: ThemeSeeds
  is_public: boolean
  likes: number
  created_at: string
  groups: string[]
}

async function throwOnError(res: Response): Promise<void> {
  if (res.ok) return
  const body = await res.json().catch(() => null)
  throw new Error(body?.error ?? `Request failed with status ${res.status}`)
}

export async function fetchPublicThemes(limit = 60, offset = 0): Promise<ThemeRow[]> {
  const res = await fetch(`/api/themes?limit=${limit}&offset=${offset}`)
  await throwOnError(res)
  return res.json()
}

export async function insertTheme(
  name: string,
  colors: ThemeSeeds,
  groups: string[],
  token: string
): Promise<ThemeRow> {
  const res = await fetch('/api/themes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, colors, groups }),
  })
  await throwOnError(res)
  return res.json()
}

export async function incrementLike(id: string): Promise<void> {
  const res = await fetch(`/api/themes/${id}/like`, { method: 'POST' })
  await throwOnError(res)
}
