/**
 * migrate-themes.ts
 *
 * Reads the curated themes from the legacy src/data/themes.json and
 * bulk-inserts them into Turso in the new 4-color JSON format.
 *
 * Usage (from /v2 directory):
 *   npx tsx scripts/migrate-themes.ts
 */

import { randomUUID } from 'crypto'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { createClient, type InStatement } from '@libsql/client'
import { config } from 'dotenv'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

config({ path: resolve(__dirname, '../.env.local') })

const TURSO_DATABASE_URL = process.env.TURSO_DATABASE_URL ?? ''
const TURSO_AUTH_TOKEN = process.env.TURSO_AUTH_TOKEN ?? ''

if (!TURSO_DATABASE_URL || !TURSO_AUTH_TOKEN) {
  console.error('Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN in .env.local')
  process.exit(1)
}

interface LegacyTheme {
  id: string
  column_bg: string
  active_item: string
  active_presence: string
  mention_badge: string
  groups?: string[]
}

async function main() {
  const turso = createClient({ url: TURSO_DATABASE_URL, authToken: TURSO_AUTH_TOKEN })

  const jsonPath = resolve(__dirname, '../../src/data/themes.json')
  const { themes: legacyThemes }: { themes: LegacyTheme[] } = JSON.parse(
    readFileSync(jsonPath, 'utf-8')
  )

  console.log(`Found ${legacyThemes.length} legacy themes`)

  const statements: InStatement[] = legacyThemes.map((t) => ({
    sql: 'INSERT INTO themes (id, user_id, name, colors, groups, is_public, likes, created_at) VALUES (?, NULL, ?, ?, ?, 1, 0, ?)',
    args: [
      randomUUID(),
      t.id,
      JSON.stringify({
        column_bg: t.column_bg,
        active_item: t.active_item,
        presence: t.active_presence,
        badge: t.mention_badge,
      }),
      JSON.stringify(t.groups ?? []),
      new Date().toISOString(),
    ],
  }))

  const BATCH = 50
  let inserted = 0

  for (let i = 0; i < statements.length; i += BATCH) {
    const batch = statements.slice(i, i + BATCH)
    try {
      await turso.batch(batch, 'write')
      inserted += batch.length
      process.stdout.write(`\r  Inserted ${inserted} / ${statements.length}`)
    } catch (e) {
      console.error(`\nBatch ${i}–${i + BATCH} failed:`, e instanceof Error ? e.message : e)
    }
  }

  console.log(`\nDone. ${inserted} themes migrated to Turso.`)
}

main().catch((e) => { console.error(e); process.exit(1) })
