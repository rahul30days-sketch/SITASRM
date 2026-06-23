import type { Access, FieldAccess } from 'payload'

type UserRole =
  | 'superAdmin'
  | 'admin'
  | 'contentManager'
  | 'admissionsManager'
  | 'facultyManager'
  | 'editor'
  | 'viewer'

function hasRole(user: unknown, roles: UserRole[]): boolean {
  if (!user || typeof user !== 'object') return false
  const u = user as Record<string, unknown>
  if (typeof u.role !== 'string') return false
  return roles.includes(u.role as UserRole)
}

export const isSuperAdmin: Access = ({ req: { user } }) => {
  return hasRole(user, ['superAdmin'])
}

export const isAdmin: Access = ({ req: { user } }) => {
  return hasRole(user, ['superAdmin', 'admin'])
}

export const isAdminOrEditor: Access = ({ req: { user } }) => {
  return hasRole(user, ['superAdmin', 'admin', 'editor'])
}

export const isAdminOrContentManager: Access = ({ req: { user } }) => {
  return hasRole(user, ['superAdmin', 'admin', 'contentManager'])
}

export const isContentEditor: Access = ({ req: { user } }) => {
  return hasRole(user, ['superAdmin', 'admin', 'contentManager', 'editor'])
}

export const isAdmissionsManager: Access = ({ req: { user } }) => {
  return hasRole(user, ['superAdmin', 'admin', 'admissionsManager'])
}

export const isFacultyManager: Access = ({ req: { user } }) => {
  return hasRole(user, ['superAdmin', 'admin', 'facultyManager'])
}

export const isPublished: Access = ({ req: { user } }) => {
  if (user && hasRole(user, ['superAdmin', 'admin', 'contentManager', 'editor'])) {
    return true
  }
  return {
    status: {
      equals: 'published',
    },
  }
}

export const isAdminOrSelf: Access = ({ req: { user } }) => {
  if (!user) return false
  if (hasRole(user, ['superAdmin', 'admin'])) return true
  return {
    id: {
      equals: user.id,
    },
  }
}

export const isAuthenticated: Access = ({ req: { user } }) => {
  return Boolean(user)
}

export const isAnyone: Access = () => true

export const neverReadField: FieldAccess = () => false
