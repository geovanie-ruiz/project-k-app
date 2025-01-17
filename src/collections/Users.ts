import { isAdminOrSelf } from '@/access/isAdminOrSelf';
import { checkRole } from '@/utils/roles';
import { isACollaborator } from '@/utils/types/roles.types';
import { auth } from '@clerk/nextjs/server';
import type { AuthStrategyResult, CollectionConfig } from 'payload';
import { updateRole } from './hooks/updateRole';

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    group: 'Content',
    useAsTitle: 'username',
    hidden: ({ user }) => user?.role !== 'admin',
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
          if (usersQuery.docs.length === 0) return { user: null };
          const result: AuthStrategyResult = {
            user: {
              ...usersQuery.docs[0],
              username: usersQuery.docs[0]?.username || undefined,
              email: usersQuery.docs[0]?.email || undefined,
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
    update: isAdminOrSelf,
    delete: () => false,

    admin: ({ req: { user } }) => {
      return isACollaborator(user?.role || 'user');
    },
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'username',
      type: 'text',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'clerk_id',
      type: 'text',
      hidden: true,
    },
    {
      name: 'role',
      saveToJWT: true,
      type: 'select',
      access: {
        create: () => checkRole('admin'),
        read: () => true,
        update: () => checkRole('admin'),
      },
      admin: {
        position: 'sidebar',
      },
      hooks: {
        afterChange: [updateRole],
      },
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Creator', value: 'creator' },
        { label: 'User', value: 'user' },
      ],
    },
    {
      name: 'author_name',
      label: 'Author Name',
      type: 'text',
    },
    {
      name: 'links',
      type: 'array',
      interfaceName: 'CreatorProfiles',
      labels: {
        singular: 'Creator Profile',
        plural: 'Creator Profiles',
      },
      fields: [
        {
          name: 'site',
          type: 'select',
          options: [
            'Blog',
            'Discord',
            'Instagram',
            'Mobalytics',
            'OP.GG',
            'Podcast',
            'TCGplayer',
            'TikTok',
            'Twitch',
            'Twitter (X)',
            'YouTube',
          ],
          hasMany: false,
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          validate: (value: unknown) => {
            if (typeof value !== 'string') return 'Please enter a valid URL';

            const url = value as string;
            const urlPattern = new RegExp(
              '^(https?:\\/\\/)?' + // validate protocol
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
                '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
                '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
                '(\\#[-a-z\\d_]*)?$',
              'i'
            ); // validate fragment locator

            if (!!urlPattern.test(url)) return true;
            return 'Please enter a valid URL';
          },
          required: true,
        },
      ],
    },
  ],
};
