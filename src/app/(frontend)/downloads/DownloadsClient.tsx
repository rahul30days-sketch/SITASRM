'use client'

import { useState, useMemo } from 'react'

interface Download {
  id: string
  title: string
  description?: string
  category: string
  file?: { url: string; mimeType?: string }
  downloadCount?: number
}

const CATEGORIES = [
  { label: 'All', value: 'all' },
  { label: 'Brochure', value: 'brochure' },
  { label: 'Syllabus', value: 'syllabus' },
  { label: 'Form', value: 'form' },
  { label: 'Notice', value: 'notice' },
  { label: 'Result', value: 'result' },
  { label: 'Timetable', value: 'timetable' },
]

export function DownloadsClient({ downloads }: { downloads: Download[] }) {
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered = useMemo(() => {
    if (activeCategory === 'all') return downloads
    return downloads.filter((d) => d.category === activeCategory)
  }, [downloads, activeCategory])

  const handleDownload = async (id: string, fileUrl: string) => {
    try {
      await fetch(`/api/downloads/${id}/track`, { method: 'POST' })
    } catch {
      // tracking failure shouldn't block download
    }
    window.open(fileUrl, '_blank')
  }

  return (
    <div>
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeCategory === cat.value ? 'bg-primary text-white' : 'bg-white text-text-muted hover:bg-primary/10'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-text-muted">No downloads in this category.</p>
      ) : (
        <div className="space-y-4">
          {filtered.map((dl) => (
            <div key={dl.id} className="flex items-center justify-between rounded-md border border-border bg-white p-4 shadow-card">
              <div>
                <span className="text-xs font-medium uppercase text-secondary">{dl.category}</span>
                <h3 className="font-display font-semibold">{dl.title}</h3>
                {dl.description && <p className="text-sm text-text-muted">{dl.description}</p>}
              </div>
              {dl.file?.url && (
                <button
                  onClick={() => handleDownload(dl.id, dl.file!.url)}
                  className="shrink-0 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-light"
                >
                  Download
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
