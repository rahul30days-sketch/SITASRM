import type { Metadata } from 'next'
import Link from 'next/link'
import { safeFind } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo/metadata'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = buildMetadata({
  title: 'News & Announcements',
  seo: { metaDescription: 'Latest news, announcements, and press releases from SERI.' },
  path: '/news',
})

export const revalidate = 600

export default async function NewsPage() {
  const news = await safeFind({
    collection: 'news',
    where: { status: { equals: 'published' } },
    limit: 12,
    sort: '-publishedAt',
    depth: 0,
  })

  return (
    <div className="min-h-screen bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="font-display text-4xl font-bold text-primary lg:text-5xl">News & Announcements</h1>
        </div>
        {news.docs.length === 0 ? (
          <p className="text-center text-text-muted">No news articles yet. Check back soon!</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {news.docs.map((article) => (
              <Link key={article.id} href={`/news/${article.slug}`} className="group rounded-md border border-border bg-white shadow-card transition-shadow hover:shadow-elevated">
                <div className="p-6">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium capitalize text-primary">{article.type}</span>
                    {article.publishedAt && <span className="text-xs text-text-muted">{formatDate(article.publishedAt)}</span>}
                  </div>
                  <h2 className="font-display text-lg font-semibold group-hover:text-primary line-clamp-2">{article.title}</h2>
                  {article.excerpt && <p className="mt-2 text-sm text-text-muted line-clamp-3">{article.excerpt}</p>}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
