import { isAdmin } from '@/access/isAdmin';
import { isCollaborator } from '@/access/isCollaborator';
import type { CollectionConfig } from 'payload';
import process from 'process';

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: isCollaborator,
    read: () => true,
    update: isCollaborator,
    delete: isAdmin,
  },
  admin: {
    group: 'Content',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'cloudflare_id',
      type: 'text',
      access: {
        read: ({ req }) => {
          return req.user?.role === 'admin';
        },
        update: ({ req }) => {
          return req.user?.role === 'admin';
        },
      },
    },
  ],
  upload: {
    mimeTypes: ['image/*'],
    disableLocalStorage: true,
    adminThumbnail: ({ doc }) =>
      `${process.env.CLOUDFLARE_DELIVERY_URL}/${process.env.CLOUDFLARE_ACCOUNT_HASH}/${doc.cloudflare_id}/public`,
  },
};
