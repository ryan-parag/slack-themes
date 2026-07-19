import { verifyToken } from '@clerk/backend'
import type { VercelRequest } from '@vercel/node'

const secretKey = process.env.CLERK_SECRET_KEY

export async function getAuthUserId(req: VercelRequest): Promise<string | null> {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ') || !secretKey) return null

  const token = header.slice('Bearer '.length)
  try {
    const payload = await verifyToken(token, { secretKey })
    return payload.sub
  } catch {
    return null
  }
}
