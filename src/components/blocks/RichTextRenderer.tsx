import { RichText } from '@payloadcms/richtext-lexical/react'
import { cn } from '@/lib/utils'

interface RichTextRendererProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any
  className?: string
}

export default function RichTextRenderer({ content, className }: RichTextRendererProps) {
  if (!content) return null

  return (
    <div
      className={cn(
        'prose prose-lg max-w-none',
        'prose-headings:font-display prose-headings:text-primary',
        'prose-a:text-primary prose-a:underline-offset-2 hover:prose-a:text-primary-light',
        'prose-strong:text-text',
        'prose-img:rounded-md',
        className,
      )}
    >
      <RichText data={content} />
    </div>
  )
}
