import type { CollectionConfig } from 'payload'
import { isAdminOrContentManager, isAnyone } from '../access'

export const Recruiters: CollectionConfig = {
  slug: 'recruiters',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'tier', 'studentsHired', 'featured'],
    group: 'Placements',
  },
  access: {
    create: isAdminOrContentManager,
    read: isAnyone,
    update: isAdminOrContentManager,
    delete: isAdminOrContentManager,
  },
  fields: [
    { name: 'name', type: 'text', required: true, maxLength: 100 },
    { name: 'logo', type: 'upload', relationTo: 'media', required: true },
    { name: 'website', type: 'text', maxLength: 200 },
    {
      name: 'tier',
      type: 'select',
      options: [
        { label: 'Platinum', value: 'platinum' },
        { label: 'Gold', value: 'gold' },
        { label: 'Silver', value: 'silver' },
        { label: 'Regular', value: 'regular' },
      ],
      defaultValue: 'regular',
    },
    { name: 'studentsHired', type: 'number' },
    { name: 'averagePackage', type: 'number' },
    { name: 'featured', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
  ],
}
