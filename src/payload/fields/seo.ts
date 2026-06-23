import type { Field } from 'payload'

export const seoFields: Field[] = [
  {
    name: 'seo',
    type: 'group',
    label: 'SEO',
    admin: {
      description: 'Search engine optimization settings for this page.',
    },
    fields: [
      {
        name: 'metaTitle',
        type: 'text',
        label: 'Meta Title',
        maxLength: 60,
        admin: {
          description: 'Keep under 60 characters for best display in search results.',
        },
      },
      {
        name: 'metaDescription',
        type: 'textarea',
        label: 'Meta Description',
        maxLength: 160,
        admin: {
          description: 'Keep under 160 characters. Shown in search result snippets.',
        },
      },
      {
        name: 'ogImage',
        type: 'upload',
        label: 'Open Graph Image',
        relationTo: 'media',
        admin: {
          description: 'Recommended: 1200x630px. Shown when shared on social media.',
        },
      },
      {
        name: 'canonicalUrl',
        type: 'text',
        label: 'Canonical URL',
        maxLength: 300,
        admin: {
          description: 'Set only if this page is a duplicate of another. Usually leave blank.',
        },
      },
      {
        name: 'noIndex',
        type: 'checkbox',
        label: 'Hide from search engines',
        defaultValue: false,
      },
      {
        name: 'structuredData',
        type: 'json',
        label: 'Custom Structured Data (JSON-LD)',
        admin: {
          description: 'Advanced: custom JSON-LD schema. Usually auto-generated.',
        },
      },
    ],
  },
]
