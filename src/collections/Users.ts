import { checkRole, isACollaborator } from '@/utils/roles';
import { auth } from '@clerk/nextjs/server';
import type { AuthStrategyResult, CollectionConfig } from 'payload';
import { updateRole } from './hooks/updateRole';

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'username',
  },
  auth: {
    disableLocalStrategy: true,
    strategies: [
      {
        name: 'clerk-strategy',
        authenticate: async ({ payload }) => {
          const { userId } = await auth();
          if (!userId) {
            return {
              user: null,
            };
          }
          const usersQuery = await payload.find({
            collection: 'users',
            where: {
              clerk_id: {
                equals: userId,
              },
            },
          });
          const result: AuthStrategyResult = {
            user: {
              ...usersQuery.docs[0],
              username: usersQuery.docs[0].username || undefined,
              email: usersQuery.docs[0].email || undefined,
              collection: 'users',
            },
          };
          return result;
        },
      },
    ],
  },
  access: {
    create: () => false, // users created through Clerk
    read: () => checkRole('admin'),
    update: () => checkRole('admin'),
    delete: () => false,

    admin: ({ req: { user } }) => isACollaborator(user?.role || 'user'),
  },
  fields: [
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'username',
      type: 'text',
    },
    {
      name: 'clerk_id',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      hooks: {
        afterChange: [updateRole],
      },
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Creator', value: 'creator' },
        { label: 'User', value: 'user' },
      ],
    },
  ],
};
