import { auth } from '@clerk/nextjs/server';
import { Roles } from './types/globals';

export const COLLABORATORS = ['creator', 'admin'];

export const checkRole = async (role: Roles) => {
  const { sessionClaims } = await auth();
  return sessionClaims?.metadata.role === role;
};

export const isACollaborator = (role: Roles) => {
  return COLLABORATORS.includes(role);
};
