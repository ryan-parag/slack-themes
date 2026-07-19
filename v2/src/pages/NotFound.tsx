import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh gap-4 text-center px-6">
      <p className="text-6xl font-bold text-neutral-200 dark:text-neutral-800">404</p>
      <p className="text-neutral-500 text-sm">This page doesn't exist.</p>
      <Link
        to="/"
        className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
      >
        Back to themes
      </Link>
    </div>
  )
}
