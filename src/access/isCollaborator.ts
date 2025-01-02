import { COLLABORATORS } from '@/utils/types/roles.types';
import { Access } from 'payload';

export const isCollaborator: Access = ({ req: { user } }) => {
  if (!user) return false;
  if (!user.role) return false;
  return COLLABORATORS.includes(user.role);
};
