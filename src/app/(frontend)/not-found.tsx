import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="font-display text-8xl font-bold text-primary">404</h1>
      <h2 className="mt-4 font-display text-2xl font-semibold">Page Not Found</h2>
      <p className="mt-2 max-w-md text-text-muted">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <div className="mt-8 flex gap-4">
        <Link href="/" className="rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-light">
          Go to Homepage
        </Link>
        <Link href="/contact" className="rounded-md border border-primary px-6 py-3 text-sm font-semibold text-primary hover:bg-primary/5">
          Contact Us
        </Link>
      </div>
    </div>
  )
}
