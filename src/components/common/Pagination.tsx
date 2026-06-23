'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'

interface PaginationProps {
  currentPage: number
  totalPages: number
  baseUrl: string
}

function getPageUrl(baseUrl: string, page: number): string {
  if (page === 1) return baseUrl
  return `${baseUrl}?page=${page}`
}

function getVisiblePages(currentPage: number, totalPages: number): (number | 'ellipsis')[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const pages: (number | 'ellipsis')[] = []

  // Always show first page
  pages.push(1)

  // Calculate the range around the current page
  const rangeStart = Math.max(2, currentPage - 2)
  const rangeEnd = Math.min(totalPages - 1, currentPage + 2)

  if (rangeStart > 2) {
    pages.push('ellipsis')
  }

  for (let i = rangeStart; i <= rangeEnd; i++) {
    pages.push(i)
  }

  if (rangeEnd < totalPages - 1) {
    pages.push('ellipsis')
  }

  // Always show last page
  if (totalPages > 1) {
    pages.push(totalPages)
  }

  return pages
}

export default function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
  if (totalPages <= 1) return null

  const visiblePages = getVisiblePages(currentPage, totalPages)
  const hasPrevious = currentPage > 1
  const hasNext = currentPage < totalPages

  const baseStyles =
    'inline-flex items-center justify-center rounded-sm border border-border px-3 py-2 text-sm font-medium transition-colors'
  const activeStyles = 'border-primary bg-primary text-white'
  const inactiveStyles = 'bg-white text-text hover:bg-primary-50 hover:border-primary-200'
  const disabledStyles = 'pointer-events-none opacity-40'

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-1.5">
      {hasPrevious ? (
        <Link
          href={getPageUrl(baseUrl, currentPage - 1)}
          className={cn(baseStyles, inactiveStyles)}
          aria-label="Go to previous page"
        >
          <svg
            className="mr-1.5 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
          Previous
        </Link>
      ) : (
        <span className={cn(baseStyles, disabledStyles)} aria-disabled="true">
          <svg
            className="mr-1.5 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
          Previous
        </span>
      )}

      <div className="hidden items-center gap-1 sm:flex">
        {visiblePages.map((page, index) => {
          if (page === 'ellipsis') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="inline-flex h-10 w-10 items-center justify-center text-sm text-text-muted"
                aria-hidden="true"
              >
                ...
              </span>
            )
          }

          const isCurrent = page === currentPage

          return isCurrent ? (
            <span
              key={page}
              className={cn(baseStyles, 'h-10 w-10 p-0', activeStyles)}
              aria-current="page"
              aria-label={`Page ${page}, current page`}
            >
              {page}
            </span>
          ) : (
            <Link
              key={page}
              href={getPageUrl(baseUrl, page)}
              className={cn(baseStyles, 'h-10 w-10 p-0', inactiveStyles)}
              aria-label={`Go to page ${page}`}
            >
              {page}
            </Link>
          )
        })}
      </div>

      <span className="text-sm text-text-muted sm:hidden">
        Page {currentPage} of {totalPages}
      </span>

      {hasNext ? (
        <Link
          href={getPageUrl(baseUrl, currentPage + 1)}
          className={cn(baseStyles, inactiveStyles)}
          aria-label="Go to next page"
        >
          Next
          <svg
            className="ml-1.5 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </Link>
      ) : (
        <span className={cn(baseStyles, disabledStyles)} aria-disabled="true">
          Next
          <svg
            className="ml-1.5 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </span>
      )}
    </nav>
  )
}
