import type { VercelRequest, VercelResponse } from '@vercel/node'
import { turso } from '../../_lib/turso'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { id } = req.query
  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Missing theme id' })
  }

  const result = await turso.execute({
    sql: 'UPDATE themes SET likes = likes + 1 WHERE id = ? AND is_public = 1 RETURNING likes',
    args: [id],
  })

  if (result.rows.length === 0) {
    return res.status(404).json({ error: 'Theme not found' })
  }

  return res.status(200).json({ likes: Number(result.rows[0].likes) })
}
