import type { Block } from 'payload'

export const FormBlock: Block = {
  slug: 'form',
  labels: { singular: 'Form', plural: 'Forms' },
  fields: [
    {
      name: 'formType',
      type: 'select',
      required: true,
      options: [
        { label: 'Contact Form', value: 'contact' },
        { label: 'Inquiry Form', value: 'inquiry' },
        { label: 'Brochure Request', value: 'brochure' },
      ],
    },
    { name: 'heading', type: 'text', maxLength: 100 },
    { name: 'description', type: 'textarea', maxLength: 300 },
  ],
}
