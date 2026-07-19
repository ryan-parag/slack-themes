import type { VercelRequest, VercelResponse } from '@vercel/node'
import { randomUUID } from 'crypto'
import { turso } from '../_lib/turso.js'
import { getAuthUserId } from '../_lib/auth.js'
import type { ThemeSeeds } from '../../src/utils/themeGenerator.js'

interface ThemeRow {
  id: string
  user_id: string | null
  name: string
  colors: ThemeSeeds
  is_public: boolean
  likes: number
  created_at: string
  groups: string[]
}

function rowToTheme(row: Record<string, unknown>): ThemeRow {
  return {
    id: row.id as string,
    user_id: (row.user_id as string) ?? null,
    name: row.name as string,
    colors: JSON.parse(row.colors as string),
    is_public: Boolean(row.is_public),
    likes: Number(row.likes),
    created_at: row.created_at as string,
    groups: JSON.parse(row.groups as string),
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    const limit = Number(req.query.limit ?? 60)
    const offset = Number(req.query.offset ?? 0)

    const result = await turso.execute({
      sql: 'SELECT * FROM themes WHERE is_public = 1 ORDER BY likes DESC LIMIT ? OFFSET ?',
      args: [limit, offset],
    })

    return res.status(200).json(result.rows.map((row) => rowToTheme(row as Record<string, unknown>)))
  }

  if (req.method === 'POST') {
    const userId = await getAuthUserId(req)
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const { name, colors, groups } = req.body as { name: string; colors: ThemeSeeds; groups: string[] }
    if (!name || !colors) {
      return res.status(400).json({ error: 'Missing name or colors' })
    }

    const id = randomUUID()
    const createdAt = new Date().toISOString()

    await turso.execute({
      sql: 'INSERT INTO themes (id, user_id, name, colors, groups, is_public, likes, created_at) VALUES (?, ?, ?, ?, ?, 1, 0, ?)',
      args: [id, userId, name, JSON.stringify(colors), JSON.stringify(groups ?? []), createdAt],
    })

    const row: ThemeRow = {
      id,
      user_id: userId,
      name,
      colors,
      is_public: true,
      likes: 0,
      created_at: createdAt,
      groups: groups ?? [],
    }

    return res.status(201).json(row)
  }

  res.setHeader('Allow', 'GET, POST')
  return res.status(405).json({ error: 'Method not allowed' })
}
