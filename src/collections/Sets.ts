import type { CollectionConfig } from 'payload';

import { isAdmin } from '@/access/isAdmin';
import { isCollaborator } from '@/access/isCollaborator';

export const Sets: CollectionConfig = {
  slug: 'sets',
  access: {
    create: isCollaborator,
    delete: isAdmin,
    read: () => true,
    update: isCollaborator,
  },
  admin: {
    group: 'Library',
    useAsTitle: 'name',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Set Name',
          required: true,
        },
        {
          name: 'releasedAt',
          type: 'date',
          label: 'Release Date',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'set_code',
          type: 'text',
          label: 'Set Code',
        },
        {
          name: 'total',
          type: 'number',
          admin: {
            description: 'The published card total for the set',
          },
        },
        {
          name: 'collectible',
          type: 'number',
          admin: {
            description: 'The true card total for the set',
          },
        },
      ],
    },
    {
      name: 'key_art',
      type: 'upload',
      label: 'Key/Cover Art',
      relationTo: 'media',
    },
  ],
};
