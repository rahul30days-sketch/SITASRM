'use client'

import { useState, useMemo } from 'react'

interface Album {
  id: string
  title: string
  category: string
  images?: { image: { url: string; alt: string } }[]
}

const CATEGORIES = [
  { label: 'All', value: 'all' },
  { label: 'Campus', value: 'campus' },
  { label: 'Events', value: 'events' },
  { label: 'Academics', value: 'academics' },
  { label: 'Sports', value: 'sports' },
  { label: 'Cultural', value: 'cultural' },
  { label: 'Labs', value: 'labs' },
]

export function GalleryClient({ albums }: { albums: Album[] }) {
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered = useMemo(() => {
    if (activeCategory === 'all') return albums
    return albums.filter((a) => a.category === activeCategory)
  }, [albums, activeCategory])

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
        <p className="py-12 text-center text-text-muted">No albums in this category.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((album) => (
            <div key={album.id} className="group overflow-hidden rounded-md border border-border bg-white shadow-card">
              <div className="aspect-video bg-primary/10 flex items-center justify-center">
                <span className="text-sm text-text-muted">{album.images?.length || 0} photos</span>
              </div>
              <div className="p-4">
                <span className="text-xs font-medium uppercase text-secondary">{album.category}</span>
                <h3 className="mt-1 font-display text-lg font-semibold">{album.title}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
