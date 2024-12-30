import type { CollectionConfig } from 'payload';

import { isAdmin } from '@/access/isAdmin';
import { isCollaborator } from '@/access/isCollaborator';
import {
  FixedToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical';

export const Keywords: CollectionConfig = {
  slug: 'keywords',
  access: {
    create: isCollaborator,
    delete: isAdmin,
    read: () => true,
    update: isCollaborator,
  },
  admin: {
    group: 'Details',
    useAsTitle: 'keyword',
    defaultColumns: ['keyword', 'color', 'reminder_text'],
  },
  fields: [
    {
      name: 'keyword',
      type: 'text',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'color',
          type: 'select',
          admin: {
            components: {
              Cell: '@/fields/colorSelect/cell',
            },
          },
          options: [
            {
              label: 'Calm Green',
              value: '#699667',
            },
            {
              label: 'Chaos Purple',
              value: '#835b86',
            },
            {
              label: 'Fury Red',
              value: '#a74e56',
            },
            {
              label: 'Mental Blue',
              value: '#566f94',
            },
            {
              label: 'Order Yellow',
              value: '#ab972c',
            },
            {
              label: 'Physical Orange',
              value: '#ba7152',
            },
          ],
        },
        {
          name: 'preview',
          label: 'Preview',
          type: 'ui',
          admin: {
            disableListColumn: true,
            components: {
              Field: '@/fields/colorSelect/field',
            },
          },
        },
      ],
    },
    {
      name: 'reminder_text',
      label: 'Reminder Text',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          FixedToolbarFeature(),
        ],
      }),
    },
  ],
};
