export type Roles = 'user' | 'creator' | 'admin' | 'patron';
export const COLLABORATORS = ['creator', 'admin'];

export const isACollaborator = (role: Roles) => {
  return COLLABORATORS.includes(role);
};

export const normalizeClerkRole = (role: unknown): Roles => {
  if (!role) return 'user';
  if (typeof role === 'string' && COLLABORATORS.includes(role))
    return role as Roles;
  return 'user';
};
