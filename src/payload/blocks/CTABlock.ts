import type { Block } from 'payload'

export const CTABlock: Block = {
  slug: 'cta',
  labels: { singular: 'Call to Action', plural: 'CTAs' },
  fields: [
    { name: 'heading', type: 'text', required: true, maxLength: 100 },
    { name: 'body', type: 'textarea', maxLength: 500 },
    {
      name: 'primaryCta',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', maxLength: 50 },
        { name: 'url', type: 'text', maxLength: 300 },
      ],
    },
    {
      name: 'secondaryCta',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', maxLength: 50 },
        { name: 'url', type: 'text', maxLength: 300 },
      ],
    },
    {
      name: 'backgroundColor',
      type: 'select',
      defaultValue: 'primary',
      options: [
        { label: 'Primary (Navy)', value: 'primary' },
        { label: 'Secondary (Gold)', value: 'secondary' },
        { label: 'Accent (Red)', value: 'accent' },
        { label: 'Light', value: 'light' },
      ],
    },
  ],
}
