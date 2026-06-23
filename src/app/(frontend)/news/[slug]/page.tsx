import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { safeFind } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo/metadata'
import Breadcrumb from '@/components/common/Breadcrumb'
import JsonLd from '@/components/seo/JsonLd'
import { articleSchema } from '@/lib/seo/schemas'
import { formatDate } from '@/lib/utils'
import RichTextRenderer from '@/components/blocks/RichTextRenderer'

export const revalidate = 1800

export async function generateStaticParams() {
  const news = await safeFind({ collection: 'news', where: { status: { equals: 'published' } }, limit: 100, depth: 0 })
  return news.docs.map((n) => ({ slug: n.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const result = await safeFind({ collection: 'news', where: { slug: { equals: slug } }, limit: 1, depth: 0 })
  const article = result.docs[0]
  if (!article) return {}
  return buildMetadata({ title: article.title, seo: article.seo as Record<string, unknown> | undefined, path: `/news/${slug}` })
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const result = await safeFind({ collection: 'news', where: { slug: { equals: slug }, status: { equals: 'published' } }, limit: 1, depth: 2 })
  const article = result.docs[0] as any
  if (!article) notFound()

  const author = article.author as { name: string } | null

  return (
    <>
      <JsonLd schema={articleSchema({ title: article.title as string, publishedAt: article.publishedAt as string, author: author || undefined, slug: slug })} />
      <div className="min-h-screen bg-surface">
        <div className="bg-primary px-4 py-12 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'News', href: '/news' }, { label: article.title as string, href: `/news/${slug}` }]} />
          </div>
        </div>
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <article>
            <div className="mb-4 flex items-center gap-3">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium capitalize text-primary">{article.type as string}</span>
              {article.publishedAt && <time className="text-sm text-text-muted">{formatDate(article.publishedAt as string)}</time>}
              {author && <span className="text-sm text-text-muted">by {author.name}</span>}
            </div>
            <h1 className="font-display text-3xl font-bold text-text lg:text-4xl">{article.title as string}</h1>
            {article.content && (
              <div className="mt-8">
                <RichTextRenderer content={article.content} />
              </div>
            )}
          </article>
        </div>
      </div>
    </>
  )
}
