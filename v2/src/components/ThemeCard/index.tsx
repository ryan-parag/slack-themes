import { useState } from 'react'
import { generateTheme, toSlackPasteString } from '@/utils/themeGenerator'
import { MockSlack } from '@/components/MockSlack'
import { useThemeStore } from '@/store/themeStore'
import { incrementLike } from '@/lib/api'
import type { ThemeRow } from '@/lib/api'

interface ThemeCardProps {
  theme: ThemeRow
  onLiked?: (id: string) => void
}

export function ThemeCard({ theme, onLiked }: ThemeCardProps) {
  const derived = generateTheme(theme.colors)
  const setSeeds = useThemeStore((s) => s.setSeeds)
  const [copied, setCopied] = useState(false)
  const [likeCount, setLikeCount] = useState(theme.likes)
  const [liked, setLiked] = useState(false)

  async function handleLike() {
    if (liked) return
    setLiked(true)
    setLikeCount((n) => n + 1)
    try {
      await incrementLike(theme.id)
      onLiked?.(theme.id)
    } catch {
      // Optimistic — ignore error, already reflected in UI
    }
  }

  function handleCopy(e: React.MouseEvent) {
    e.stopPropagation()
    navigator.clipboard.writeText(toSlackPasteString(theme.colors)).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  function handleLikeClick(e: React.MouseEvent) {
    e.stopPropagation()
    handleLike()
  }

  function handleApply() {
    setSeeds(theme.colors)
  }

  return (
    <div
      onClick={handleApply}
      className="group flex flex-col rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors cursor-pointer"
      title="Click to apply this theme to the app"
    >
      {/* Preview */}
      <div className="p-2 bg-neutral-50 dark:bg-neutral-950">
        <MockSlack theme={derived} compact />
      </div>

      {/* Info + actions */}
      <div className="flex items-center gap-2 px-3 py-2.5">
        {/* Color swatches */}
        <div className="flex gap-1">
          {[theme.colors.column_bg, theme.colors.active_item, theme.colors.presence, theme.colors.badge].map((hex, i) => (
            <span
              key={i}
              className="w-3.5 h-3.5 rounded-full border border-black/10 dark:border-white/10"
              style={{ backgroundColor: hex }}
            />
          ))}
        </div>

        {/* Name */}
        <span className="flex-1 text-xs font-medium text-neutral-700 dark:text-neutral-300 truncate">
          {theme.name}
        </span>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {/* Like */}
          <button
            onClick={handleLikeClick}
            className={[
              'flex items-center gap-1 px-1.5 py-1 rounded text-xs transition-colors',
              liked
                ? 'text-rose-500'
                : 'text-neutral-400 hover:text-rose-400',
            ].join(' ')}
            title="Like this theme"
          >
            <HeartIcon filled={liked} />
            <span>{likeCount}</span>
          </button>

          {/* Copy Slack paste format */}
          <button
            onClick={handleCopy}
            className="p-1.5 rounded text-neutral-400 hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            title="Copy theme (paste into Slack)"
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Icons ───────────────────────────────────────────────────────────────────

function HeartIcon({ filled }: { filled: boolean }) {
  return filled ? (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
    </svg>
  ) : (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  )
}

function CopyIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="text-emerald-400">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  )
}
