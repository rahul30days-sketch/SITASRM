import type { GlobalConfig } from 'payload'
import { isAdminOrContentManager, isAnyone } from '../access'

export const Footer: GlobalConfig = {
  slug: 'footer',
  admin: {
    group: 'Settings',
  },
  access: {
    read: isAnyone,
    update: isAdminOrContentManager,
  },
  fields: [
    {
      name: 'columns',
      type: 'array',
      maxRows: 5,
      fields: [
        { name: 'heading', type: 'text', required: true, maxLength: 50 },
        {
          name: 'links',
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
      name: 'bottomLinks',
      type: 'array',
      maxRows: 6,
      fields: [
        { name: 'label', type: 'text', required: true, maxLength: 50 },
        { name: 'href', type: 'text', required: true, maxLength: 200 },
      ],
    },
    { name: 'copyrightText', type: 'text', maxLength: 200 },
    { name: 'showSocialLinks', type: 'checkbox', defaultValue: true },
  ],
}
