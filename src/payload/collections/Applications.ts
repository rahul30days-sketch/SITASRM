import type { CollectionConfig } from 'payload'
import { isAdmissionsManager, isAnyone } from '../access'

export const Applications: CollectionConfig = {
  slug: 'applications',
  admin: {
    useAsTitle: 'applicantName',
    defaultColumns: ['applicationNumber', 'applicantName', 'programApplied', 'applicationStatus', 'createdAt'],
    group: 'Forms',
  },
  access: {
    create: isAnyone,
    read: isAdmissionsManager,
    update: isAdmissionsManager,
    delete: isAdmissionsManager,
  },
  fields: [
    { name: 'applicantName', type: 'text', required: true, maxLength: 100 },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text', maxLength: 15 },
    {
      name: 'dob',
      type: 'date',
      required: true,
      admin: { date: { pickerAppearance: 'dayOnly' } },
    },
    {
      name: 'gender',
      type: 'select',
      required: true,
      options: [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Other', value: 'other' },
        { label: 'Prefer not to say', value: 'prefer-not-to-say' },
      ],
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'General', value: 'general' },
        { label: 'OBC', value: 'obc' },
        { label: 'SC', value: 'sc' },
        { label: 'ST', value: 'st' },
        { label: 'EWS', value: 'ews' },
      ],
    },
    { name: 'programApplied', type: 'relationship', relationTo: 'programs', required: true },
    {
      name: 'academicDetails',
      type: 'group',
      fields: [
        { name: 'class10Percent', type: 'number', min: 0, max: 100 },
        { name: 'class10Board', type: 'text', maxLength: 50 },
        { name: 'class12Percent', type: 'number', min: 0, max: 100 },
        { name: 'class12Board', type: 'text', maxLength: 50 },
        { name: 'graduationPercent', type: 'number', min: 0, max: 100 },
      ],
    },
    {
      name: 'address',
      type: 'group',
      fields: [
        { name: 'street', type: 'text', maxLength: 200 },
        { name: 'city', type: 'text', maxLength: 100 },
        { name: 'state', type: 'text', maxLength: 100 },
        { name: 'pincode', type: 'text', maxLength: 6 },
      ],
    },
    {
      name: 'documents',
      type: 'group',
      fields: [
        { name: 'photo', type: 'upload', relationTo: 'media' },
        { name: 'signature', type: 'upload', relationTo: 'media' },
        { name: 'marksheet10', type: 'upload', relationTo: 'media' },
        { name: 'marksheet12', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'applicationStatus',
      type: 'select',
      defaultValue: 'submitted',
      options: [
        { label: 'Submitted', value: 'submitted' },
        { label: 'Under Review', value: 'under-review' },
        { label: 'Shortlisted', value: 'shortlisted' },
        { label: 'Accepted', value: 'accepted' },
        { label: 'Rejected', value: 'rejected' },
        { label: 'Waitlisted', value: 'waitlisted' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'remarks', type: 'textarea', maxLength: 500, admin: { position: 'sidebar' } },
    {
      name: 'applicationNumber',
      type: 'text',
      unique: true,
      admin: { readOnly: true, position: 'sidebar' },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === 'create' && !data.applicationNumber) {
          const year = new Date().getFullYear()
          const random = Math.floor(10000 + Math.random() * 90000)
          data.applicationNumber = `SERI-${year}-${random}`
        }
        return data
      },
    ],
  },
}
