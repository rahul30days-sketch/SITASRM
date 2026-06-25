import { revalidatePath } from 'next/cache'
import type { GlobalConfig } from 'payload'
import { isAdmin, isAnyone } from '../access'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: {
    group: 'Settings',
  },
  access: {
    read: isAnyone,
    update: isAdmin,
  },
  hooks: {
    afterChange: [
      () => {
        revalidatePath('/', 'layout')
      },
    ],
  },
  fields: [
    { name: 'siteName', type: 'text', required: true, maxLength: 100 },
    { name: 'tagline', type: 'text', maxLength: 200 },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'favicon', type: 'upload', relationTo: 'media' },
    {
      name: 'hero',
      type: 'group',
      label: 'Homepage Hero',
      admin: { description: 'Controls the full-screen homepage hero section.' },
      fields: [
        { name: 'backgroundImage', type: 'upload', relationTo: 'media', admin: { description: 'Full-bleed background image for the hero.' } },
        { name: 'badge', type: 'text', maxLength: 120 },
        { name: 'headingTop', type: 'text', maxLength: 80, admin: { description: 'First line of the headline (white).' } },
        { name: 'headingHighlight', type: 'text', maxLength: 40, admin: { description: 'Highlighted second line (gold gradient).' } },
        { name: 'subheading', type: 'textarea', maxLength: 200 },
        {
          name: 'primaryCta',
          type: 'group',
          fields: [{ name: 'label', type: 'text', maxLength: 40 }, { name: 'href', type: 'text', maxLength: 200 }],
        },
        {
          name: 'secondaryCta',
          type: 'group',
          fields: [{ name: 'label', type: 'text', maxLength: 40 }, { name: 'href', type: 'text', maxLength: 200 }],
        },
        {
          name: 'tertiaryCta',
          type: 'group',
          fields: [{ name: 'label', type: 'text', maxLength: 40 }, { name: 'href', type: 'text', maxLength: 200 }],
        },
        {
          name: 'trustItems',
          type: 'array',
          maxRows: 4,
          fields: [
            {
              name: 'icon',
              type: 'select',
              defaultValue: 'shield',
              options: [
                { label: 'Building', value: 'building' },
                { label: 'Rupee', value: 'rupee' },
                { label: 'Shield', value: 'shield' },
                { label: 'Award', value: 'award' },
              ],
            },
            { name: 'label', type: 'text', maxLength: 60 },
          ],
        },
        {
          name: 'chips',
          type: 'array',
          maxRows: 3,
          label: 'Floating Stat Chips',
          fields: [{ name: 'value', type: 'text', maxLength: 20 }, { name: 'label', type: 'text', maxLength: 40 }],
        },
        {
          name: 'tickerItems',
          type: 'array',
          maxRows: 12,
          label: 'Bottom Ticker Items',
          fields: [{ name: 'text', type: 'text', maxLength: 60 }],
        },
      ],
    },
    {
      name: 'phone',
      type: 'array',
      maxRows: 3,
      fields: [{ name: 'number', type: 'text', required: true, maxLength: 15 }],
    },
    {
      name: 'email',
      type: 'array',
      maxRows: 3,
      fields: [{ name: 'address', type: 'email', required: true }],
    },
    { name: 'address', type: 'textarea', maxLength: 500 },
    { name: 'mapEmbedUrl', type: 'text', maxLength: 500 },
    {
      name: 'socialLinks',
      type: 'group',
      fields: [
        { name: 'facebook', type: 'text', maxLength: 200 },
        { name: 'twitter', type: 'text', maxLength: 200 },
        { name: 'instagram', type: 'text', maxLength: 200 },
        { name: 'linkedin', type: 'text', maxLength: 200 },
        { name: 'youtube', type: 'text', maxLength: 200 },
        { name: 'whatsapp', type: 'text', maxLength: 200 },
      ],
    },
    {
      name: 'announcementBanner',
      type: 'group',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: false },
        { name: 'message', type: 'text', maxLength: 300 },
        { name: 'link', type: 'text', maxLength: 200 },
        {
          name: 'type',
          type: 'select',
          defaultValue: 'info',
          options: [
            { label: 'Info', value: 'info' },
            { label: 'Warning', value: 'warning' },
            { label: 'Success', value: 'success' },
            { label: 'Urgent', value: 'urgent' },
          ],
        },
      ],
    },
    { name: 'googleAnalyticsId', type: 'text', maxLength: 30 },
    {
      name: 'stats',
      type: 'group',
      fields: [
        { name: 'establishedYear', type: 'number' },
        { name: 'programCount', type: 'number' },
        { name: 'facultyCount', type: 'number' },
        { name: 'studentCount', type: 'number' },
        { name: 'placementPercent', type: 'number' },
        { name: 'campusAcres', type: 'number' },
      ],
    },
  ],
}
