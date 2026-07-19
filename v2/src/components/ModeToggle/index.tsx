interface ModeToggleProps {
  mode: 'light' | 'dark'
  onChange: (mode: 'light' | 'dark') => void
}

export function ModeToggle({ mode, onChange }: ModeToggleProps) {
  return (
    <div className="inline-flex items-center gap-0.5 p-1 rounded-full bg-neutral-100 dark:bg-neutral-800 shrink-0">
      {(['light', 'dark'] as const).map((m) => (
        <button
          key={m}
          onClick={() => onChange(m)}
          className={[
            'px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer capitalize',
            m === mode
              ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900'
              : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white',
          ].join(' ')}
        >
          {m}
        </button>
      ))}
    </div>
  )
}
