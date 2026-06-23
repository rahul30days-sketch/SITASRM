import type { CollectionConfig } from 'payload'
import { APIError } from 'payload'
import { isSuperAdmin, isAdmin, isAdminOrSelf } from '../access'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    maxLoginAttempts: 5,
    lockTime: 600000,
    useAPIKey: true,
    cookies: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
    },
    tokenExpiration: 7200,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'role', 'isActive'],
    group: 'System',
  },
  access: {
    create: isAdmin,
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    delete: isSuperAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      maxLength: 100,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'viewer',
      options: [
        { label: 'Super Admin', value: 'superAdmin' },
        { label: 'Admin', value: 'admin' },
        { label: 'Content Manager', value: 'contentManager' },
        { label: 'Admissions Manager', value: 'admissionsManager' },
        { label: 'Faculty Manager', value: 'facultyManager' },
        { label: 'Editor', value: 'editor' },
        { label: 'Viewer', value: 'viewer' },
      ],
      access: {
        update: ({ req: { user } }) => {
          if (!user) return false
          return user.role === 'superAdmin' || user.role === 'admin'
        },
      },
    },
    {
      name: 'profileImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'lastLogin',
      type: 'date',
      admin: { readOnly: true, position: 'sidebar' },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
  ],
  hooks: {
    beforeOperation: [
      ({ args, operation }) => {
        if (operation === 'create' || operation === 'update') {
          const data = args.data as Record<string, unknown> | undefined
          if (data?.password && typeof data.password === 'string') {
            if (data.password.length > 128) {
              throw new APIError('Password must not exceed 128 characters.', 400)
            }
            if (data.password.length < 8) {
              throw new APIError('Password must be at least 8 characters long.', 400)
            }
          }
        }
        return args
      },
    ],
    afterLogin: [
      async ({ user, req }) => {
        await req.payload.update({
          collection: 'users',
          id: user.id,
          data: { lastLogin: new Date().toISOString() },
        })
        return user
      },
    ],
  },
}
