import type { Field } from 'payload'

export const statusField: Field = {
  name: 'status',
  type: 'select',
  required: true,
  defaultValue: 'draft',
  options: [
    { label: 'Draft', value: 'draft' },
    { label: 'Published', value: 'published' },
    { label: 'Scheduled', value: 'scheduled' },
  ],
  admin: {
    position: 'sidebar',
  },
}

export const scheduledAtField: Field = {
  name: 'scheduledAt',
  type: 'date',
  label: 'Scheduled Publish Date',
  admin: {
    position: 'sidebar',
    condition: (_data, siblingData) => siblingData?.status === 'scheduled',
    date: {
      pickerAppearance: 'dayAndTime',
    },
  },
}
