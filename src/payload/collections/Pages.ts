import type { CollectionConfig } from 'payload'
import { isAdminOrContentManager, isPublished } from '../access'
import { slugField } from '../fields/slug'
import { statusField, scheduledAtField } from '../fields/status'
import { seoFields } from '../fields/seo'
import { HeroBlock } from '../blocks/HeroBlock'
import { StatsBlock } from '../blocks/StatsBlock'
import { ContentBlock } from '../blocks/ContentBlock'
import { CardsBlock } from '../blocks/CardsBlock'
import { CTABlock } from '../blocks/CTABlock'
import { AccordionBlock } from '../blocks/AccordionBlock'
import { GalleryBlock } from '../blocks/GalleryBlock'
import { FormBlock } from '../blocks/FormBlock'
import { TestimonialsBlock } from '../blocks/TestimonialsBlock'
import { TimelineBlock } from '../blocks/TimelineBlock'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status', 'updatedAt'],
    group: 'Content',
  },
  access: {
    create: isAdminOrContentManager,
    read: isPublished,
    update: isAdminOrContentManager,
    delete: isAdminOrContentManager,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      maxLength: 150,
    },
    slugField,
    statusField,
    scheduledAtField,
    {
      name: 'hero',
      type: 'group',
      fields: [
        {
          name: 'type',
          type: 'select',
          defaultValue: 'simple',
          options: [
            { label: 'Simple', value: 'simple' },
            { label: 'Video', value: 'video' },
            { label: 'Fullscreen', value: 'fullscreen' },
            { label: 'Minimal', value: 'minimal' },
          ],
        },
        { name: 'heading', type: 'text', maxLength: 100 },
        { name: 'subheading', type: 'text', maxLength: 200 },
        {
          name: 'ctaPrimary',
          type: 'group',
          fields: [
            { name: 'label', type: 'text', maxLength: 50 },
            { name: 'url', type: 'text', maxLength: 300 },
          ],
        },
        {
          name: 'ctaSecondary',
          type: 'group',
          fields: [
            { name: 'label', type: 'text', maxLength: 50 },
            { name: 'url', type: 'text', maxLength: 300 },
          ],
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'backgroundVideo',
          type: 'text',
          maxLength: 500,
          admin: {
            condition: (_data, siblingData) => siblingData?.type === 'video',
          },
        },
      ],
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        HeroBlock,
        StatsBlock,
        ContentBlock,
        CardsBlock,
        CTABlock,
        AccordionBlock,
        GalleryBlock,
        FormBlock,
        TestimonialsBlock,
        TimelineBlock,
      ],
    },
    {
      name: 'breadcrumb',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'template',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Wide', value: 'wide' },
        { label: 'Centered', value: 'centered' },
        { label: 'Sidebar', value: 'sidebar' },
      ],
      admin: { position: 'sidebar' },
    },
    ...seoFields,
  ],
}
