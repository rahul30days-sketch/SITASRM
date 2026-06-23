import type { Block } from 'payload'

export const TimelineBlock: Block = {
  slug: 'timeline',
  labels: { singular: 'Timeline', plural: 'Timelines' },
  fields: [
    { name: 'heading', type: 'text', maxLength: 100 },
    {
      name: 'steps',
      type: 'array',
      maxRows: 12,
      fields: [
        { name: 'step', type: 'number', required: true },
        { name: 'title', type: 'text', required: true, maxLength: 80 },
        { name: 'description', type: 'textarea', maxLength: 300 },
      ],
    },
  ],
}
