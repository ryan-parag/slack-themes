import { useState, useRef, useEffect } from 'react'
import { HexColorPicker, HexColorInput } from 'react-colorful'

interface ColorPickerProps {
  label: string
  value: string
  onChange: (hex: string) => void
  description?: string
}

export function ColorPicker({ label, value, onChange, description }: ColorPickerProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    if (!open) return
    function handleClick(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border border-neutral-800 hover:border-neutral-600 transition-colors group"
      >
        {/* Swatch */}
        <span
          className="w-8 h-8 rounded-md shrink-0 border border-white/10 shadow-sm transition-transform group-hover:scale-105"
          style={{ backgroundColor: value }}
        />
        <div className="flex-1 text-left min-w-0">
          <p className="text-xs font-medium text-neutral-200 leading-tight">{label}</p>
          {description && (
            <p className="text-xs text-neutral-500 leading-tight mt-0.5 truncate">{description}</p>
          )}
        </div>
        <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
          {value}
        </span>
        <ChevronIcon open={open} />
      </button>

      {open && (
        <div className="absolute left-0 right-0 z-50 mt-1 p-3 bg-neutral-900 border border-neutral-700 rounded-xl shadow-xl">
          <HexColorPicker
            color={value}
            onChange={onChange}
            style={{ width: '100%', height: 160 }}
          />
          <div className="flex items-center gap-2 mt-3">
            <span className="text-neutral-500 text-xs font-mono">#</span>
            <HexColorInput
              color={value}
              onChange={onChange}
              prefixed={false}
              className="flex-1 bg-neutral-800 border border-neutral-700 rounded-md px-2 py-1.5 text-xs font-mono text-white uppercase tracking-widest outline-none focus:border-neutral-500"
            />
          </div>
        </div>
      )}
    </div>
  )
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className={`text-neutral-500 transition-transform shrink-0 ${open ? 'rotate-180' : ''}`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  )
}
