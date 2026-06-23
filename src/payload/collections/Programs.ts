import type { CollectionConfig } from 'payload'
import { isAdminOrContentManager, isPublished } from '../access'
import { slugField } from '../fields/slug'
import { statusField, scheduledAtField } from '../fields/status'
import { seoFields } from '../fields/seo'

export const Programs: CollectionConfig = {
  slug: 'programs',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'duration', 'status'],
    group: 'Academics',
  },
  access: {
    create: isAdminOrContentManager,
    read: isPublished,
    update: isAdminOrContentManager,
    delete: isAdminOrContentManager,
  },
  fields: [
    { name: 'name', type: 'text', required: true, maxLength: 100 },
    slugField,
    { name: 'shortDescription', type: 'textarea', maxLength: 300 },
    { name: 'fullDescription', type: 'richText' },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Undergraduate', value: 'undergraduate' },
        { label: 'Postgraduate', value: 'postgraduate' },
        { label: 'Diploma', value: 'diploma' },
        { label: 'Certificate', value: 'certificate' },
        { label: 'PhD', value: 'phd' },
      ],
    },
    { name: 'duration', type: 'text', maxLength: 30 },
    { name: 'totalSeats', type: 'number' },
    { name: 'eligibility', type: 'richText' },
    {
      name: 'fees',
      type: 'group',
      fields: [
        { name: 'tuitionFee', type: 'number' },
        { name: 'hostelFee', type: 'number' },
        { name: 'otherFees', type: 'number' },
        { name: 'scholarshipAvailable', type: 'checkbox', defaultValue: false },
        { name: 'feesNote', type: 'textarea', maxLength: 500 },
      ],
    },
    {
      name: 'curriculum',
      type: 'array',
      maxRows: 12,
      fields: [
        { name: 'semester', type: 'number', required: true },
        {
          name: 'subjects',
          type: 'array',
          maxRows: 20,
          fields: [
            { name: 'name', type: 'text', required: true, maxLength: 100 },
            { name: 'credits', type: 'number' },
            {
              name: 'type',
              type: 'select',
              options: [
                { label: 'Theory', value: 'theory' },
                { label: 'Practical', value: 'practical' },
                { label: 'Elective', value: 'elective' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'careerOpportunities',
      type: 'array',
      maxRows: 15,
      fields: [
        { name: 'role', type: 'text', required: true, maxLength: 100 },
        { name: 'companies', type: 'text', maxLength: 200 },
      ],
    },
    { name: 'faculty', type: 'relationship', relationTo: 'faculty', hasMany: true },
    { name: 'brochure', type: 'upload', relationTo: 'media' },
    { name: 'featuredImage', type: 'upload', relationTo: 'media' },
    { name: 'affiliatedTo', type: 'text', maxLength: 100 },
    {
      name: 'approvedBy',
      type: 'array',
      maxRows: 10,
      fields: [{ name: 'body', type: 'text', required: true, maxLength: 50 }],
    },
    {
      name: 'highlights',
      type: 'array',
      maxRows: 10,
      fields: [
        { name: 'icon', type: 'text', maxLength: 50 },
        { name: 'label', type: 'text', required: true, maxLength: 50 },
        { name: 'value', type: 'text', required: true, maxLength: 50 },
      ],
    },
    { name: 'featured', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
    statusField,
    scheduledAtField,
    ...seoFields,
  ],
}
