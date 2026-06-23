import type { Block } from 'payload'

export const GalleryBlock: Block = {
  slug: 'gallery',
  labels: { singular: 'Gallery', plural: 'Galleries' },
  fields: [
    { name: 'heading', type: 'text', maxLength: 100 },
    {
      name: 'images',
      type: 'relationship',
      relationTo: 'gallery',
      hasMany: true,
    },
  ],
}
