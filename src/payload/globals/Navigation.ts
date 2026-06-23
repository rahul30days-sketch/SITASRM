import type { GlobalConfig } from 'payload'
import { isAdminOrContentManager, isAnyone } from '../access'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  admin: {
    group: 'Settings',
  },
  access: {
    read: isAnyone,
    update: isAdminOrContentManager,
  },
  fields: [
    {
      name: 'primaryNav',
      type: 'array',
      maxRows: 10,
      fields: [
        { name: 'label', type: 'text', required: true, maxLength: 50 },
        { name: 'href', type: 'text', required: true, maxLength: 200 },
        {
          name: 'children',
          type: 'array',
          maxRows: 10,
          fields: [
            { name: 'label', type: 'text', required: true, maxLength: 50 },
            { name: 'href', type: 'text', required: true, maxLength: 200 },
          ],
        },
      ],
    },
    {
      name: 'ctaButton',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', maxLength: 50 },
        { name: 'href', type: 'text', maxLength: 200 },
        {
          name: 'variant',
          type: 'select',
          defaultValue: 'primary',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
          ],
        },
      ],
    },
  ],
}
