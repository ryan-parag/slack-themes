import { useEffect, useState } from 'react'
import { Layout } from '@/components/Layout'
import { ThemeCard } from '@/components/ThemeCard'
import { fetchPublicThemes, type ThemeRow } from '@/lib/api'

const CATEGORIES = ['All', 'Dark', 'Light', 'Minimal', 'Brand', 'Colorful']

export default function Home() {
  const [themes, setThemes] = useState<ThemeRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [category, setCategory] = useState('All')

  useEffect(() => {
    fetchPublicThemes()
      .then(setThemes)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const filtered = category === 'All'
    ? themes
    : themes.filter((t) => t.groups?.includes(category))

  return (
    <Layout>
      <div className="p-6 lg:p-8">
        {/* Page header */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-neutral-900 dark:text-white">Explore themes</h1>
          <p className="text-sm text-neutral-500 mt-1">
            Browse community themes. Click any card to edit it in the playground.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex gap-2 flex-wrap mb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={[
                'px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer',
                cat === category
                  ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 hover:text-neutral-950 dark:hover:text-neutral-50 dark:hover:bg-neutral-700',
              ].join(' ')}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Theme grid */}
        {loading ? (
          <ThemeGridSkeleton />
        ) : error ? (
          <div className="text-sm text-rose-500 bg-rose-50 dark:bg-rose-950/20 px-4 py-3 rounded-lg">
            Failed to load themes: {error}
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-sm text-neutral-400">No themes yet — be the first to create one!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {filtered.map((theme) => (
              <ThemeCard key={theme.id} theme={theme} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}

function ThemeGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden animate-pulse">
          <div className="h-[88px] bg-neutral-100 dark:bg-neutral-800" />
          <div className="h-10 bg-neutral-50 dark:bg-neutral-900" />
        </div>
      ))}
    </div>
  )
}
