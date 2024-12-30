import { auth } from '@clerk/nextjs/server';
import { COLLABORATORS, Roles } from './types/roles.types';

export const checkRole = async (role: Roles) => {
  const { sessionClaims } = await auth();
  return sessionClaims?.metadata.role === role;
};

export const checkCollaboratorAccess = async () => {
  const { sessionClaims } = await auth();
  const role = sessionClaims?.metadata.role || 'user';
  return COLLABORATORS.includes(role);
};
