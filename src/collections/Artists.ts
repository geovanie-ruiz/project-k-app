import type { CollectionConfig } from 'payload';

import { isAdmin } from '@/access/isAdmin';
import { isCollaborator } from '@/access/isCollaborator';

export const Artists: CollectionConfig = {
  slug: 'artists',
  access: {
    create: isCollaborator,
    delete: isAdmin,
    read: () => true,
    update: isCollaborator,
  },
  admin: {
    group: 'Details',
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: `Artist's Name`,
      required: true,
    },
  ],
};
