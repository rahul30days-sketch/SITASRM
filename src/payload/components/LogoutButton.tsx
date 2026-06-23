'use client'

import React from 'react'

/**
 * A "Log out" button rendered in the Payload admin header (top-right, next to
 * the account icon) via `admin.components.actions`. Navigates to Payload's
 * built-in logout route.
 */
export function LogoutButton() {
  return (
    // Full-page navigation is intentional here so the session fully resets on logout.
    // eslint-disable-next-line @next/next/no-html-link-for-pages
    <a
      href="/admin/logout"
      title="Log out"
      aria-label="Log out"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '7px 14px',
        borderRadius: '4px',
        fontSize: '13px',
        fontWeight: 600,
        lineHeight: 1,
        color: '#ffffff',
        background: '#e84040',
        textDecoration: 'none',
        whiteSpace: 'nowrap',
      }}
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
      </svg>
      Log out
    </a>
  )
}

export default LogoutButton
