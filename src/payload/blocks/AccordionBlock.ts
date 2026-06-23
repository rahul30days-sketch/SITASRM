import type { Block } from 'payload'

export const AccordionBlock: Block = {
  slug: 'accordion',
  labels: { singular: 'Accordion / FAQ', plural: 'Accordions' },
  fields: [
    { name: 'heading', type: 'text', maxLength: 100 },
    {
      name: 'items',
      type: 'array',
      maxRows: 30,
      fields: [
        { name: 'question', type: 'text', required: true, maxLength: 200 },
        { name: 'answer', type: 'richText', required: true },
      ],
    },
  ],
}
