export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

export interface CTAButton {
  label: string
  href: string
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
}

export interface SEOFields {
  metaTitle?: string
  metaDescription?: string
  ogImage?: MediaType
  canonicalUrl?: string
  noIndex?: boolean
  structuredData?: Record<string, unknown>
}

export interface MediaType {
  id: string
  alt: string
  url: string
  width?: number
  height?: number
  caption?: string
  mimeType?: string
  sizes?: {
    thumbnail?: ImageSize
    card?: ImageSize
    hero?: ImageSize
    og?: ImageSize
  }
}

export interface ImageSize {
  url: string
  width: number
  height: number
}

export interface BreadcrumbItem {
  label: string
  href: string
}

export interface StatItem {
  label: string
  value: number
  suffix?: string
  icon?: string
}

export interface TimelineStep {
  step: number
  title: string
  description: string
}
