import { SignIn, useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'

interface AuthModalProps {
  onClose: () => void
}

export function AuthModal({ onClose }: AuthModalProps) {
  const { isSignedIn } = useAuth()

  // Close automatically once sign-in completes
  useEffect(() => {
    if (isSignedIn) onClose()
  }, [isSignedIn, onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-sm bg-neutral-900 rounded-2xl border border-neutral-700 shadow-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-white">Sign in to save your theme</h2>
          <button onClick={onClose} className="text-neutral-500 hover:text-white transition-colors">
            <XIcon />
          </button>
        </div>

        <SignIn
          routing="virtual"
          appearance={{
            elements: {
              rootBox: 'w-full',
              card: 'bg-transparent shadow-none p-0 w-full',
            },
          }}
        />
      </div>
    </div>
  )
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}
