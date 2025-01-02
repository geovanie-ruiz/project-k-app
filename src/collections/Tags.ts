import type { CollectionConfig } from 'payload';

import { isAdmin } from '@/access/isAdmin';
import { isCollaborator } from '@/access/isCollaborator';

export const Tags: CollectionConfig = {
  slug: 'tags',
  access: {
    create: isCollaborator,
    delete: isAdmin,
    read: () => true,
    update: isCollaborator,
  },
  admin: {
    group: 'Details',
    useAsTitle: 'tag',
  },
  fields: [
    {
      name: 'tag',
      type: 'text',
    },
  ],
};
