import type { Field } from 'payload'

function formatSlug(val: string): string {
  return val
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export const slugField: Field = {
  name: 'slug',
  type: 'text',
  required: true,
  unique: true,
  index: true,
  maxLength: 200,
  admin: {
    position: 'sidebar',
    description: 'URL-friendly identifier. Auto-generated from title.',
  },
  hooks: {
    beforeValidate: [
      ({ value, data }) => {
        if (typeof value === 'string' && value.length > 0) {
          return formatSlug(value)
        }
        if (data?.title && typeof data.title === 'string') {
          return formatSlug(data.title)
        }
        if (data?.name && typeof data.name === 'string') {
          return formatSlug(data.name)
        }
        return value
      },
    ],
  },
  validate: (value: string | null | undefined) => {
    if (!value) return 'Slug is required'
    if (!/^[a-z0-9-]+$/.test(value)) {
      return 'Slug must contain only lowercase letters, numbers, and hyphens'
    }
    return true
  },
}
