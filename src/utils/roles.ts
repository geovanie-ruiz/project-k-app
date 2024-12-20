import { auth } from '@clerk/nextjs/server';
import { Roles } from './types/globals';

export const COLLABORATORS = ['creator', 'admin'];

export const checkRole = async (role: Roles) => {
  const { sessionClaims } = await auth();
  return sessionClaims?.metadata.role === role;
};

export const isntACollaborator = (role: Roles) => {
  return !COLLABORATORS.includes(role);
};
