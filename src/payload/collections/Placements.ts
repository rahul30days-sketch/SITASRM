import type { CollectionConfig } from 'payload'
import { isAdminOrContentManager, isAnyone } from '../access'

export const Placements: CollectionConfig = {
  slug: 'placements',
  admin: {
    useAsTitle: 'year',
    defaultColumns: ['year', 'studentsPlaced', 'highestPackage', 'averagePackage'],
    group: 'Placements',
  },
  access: {
    create: isAdminOrContentManager,
    read: isAnyone,
    update: isAdminOrContentManager,
    delete: isAdminOrContentManager,
  },
  fields: [
    { name: 'year', type: 'number', required: true },
    { name: 'totalStudents', type: 'number' },
    { name: 'studentsPlaced', type: 'number' },
    { name: 'highestPackage', type: 'number' },
    { name: 'averagePackage', type: 'number' },
    { name: 'recruitersCount', type: 'number' },
    {
      name: 'departmentWise',
      type: 'array',
      maxRows: 20,
      fields: [
        { name: 'department', type: 'relationship', relationTo: 'departments' },
        { name: 'placed', type: 'number' },
        { name: 'avg', type: 'number' },
      ],
    },
    { name: 'topRecruiters', type: 'relationship', relationTo: 'recruiters', hasMany: true },
    {
      name: 'highlights',
      type: 'array',
      maxRows: 10,
      fields: [
        { name: 'label', type: 'text', required: true, maxLength: 50 },
        { name: 'value', type: 'text', required: true, maxLength: 50 },
      ],
    },
  ],
}
