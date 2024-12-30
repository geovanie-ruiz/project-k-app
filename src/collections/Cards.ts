import type { CollectionConfig } from 'payload';

import { isAdmin } from '@/access/isAdmin';
import { isCollaborator } from '@/access/isCollaborator';
import { Card } from '@/payload-types';
import {
  FixedToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical';

const COMBAT_TYPES = ['Unit', 'Champion'];
const RULES_TYPES = ['Rune', 'Battlefield', 'Legend'];
const CHARACTER_TYPES = ['Legend', 'Spell'];
const SIMPLE_TYPES = ['Rune', 'Battlefield'];

export const Cards: CollectionConfig = {
  slug: 'cards',
  access: {
    create: isCollaborator,
    delete: isAdmin,
    read: () => true,
    update: isCollaborator,
  },
  admin: {
    group: 'Library',
    useAsTitle: 'full_card_name',
    defaultColumns: ['full_card_name', 'type', 'card_art'],
  },
  fields: [
    {
      name: 'full_card_name',
      label: 'Full Card name',
      type: 'text',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      type: 'row',
      fields: [
        {
          label: 'Card Type',
          name: 'type',
          type: 'select',
          hasMany: false,
          options: [
            'Unit',
            'Champion',
            'Legend',
            'Spell',
            'Battlefield',
            'Gear',
            'Rune',
          ],
          required: true,
        },
        {
          name: 'rune',
          type: 'select',
          hasMany: true,
          options: ['Calm', 'Chaos', 'Fury', 'Mental', 'Order', 'Physical'],
          admin: {
            condition: (data) => !!data.type && data.type !== 'Battlefield',
          },
          validate: (value, { data }) => {
            const card = data as Card;
            if (card.type === 'Battlefield') return true;
            if (!value || value.length === 0)
              return 'Please select at least one';
            if (value.length > 2) return 'Please select at most 2';
            return true;
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Card Name',
          required: true,
        },
        {
          name: 'subtitle',
          type: 'text',
          admin: {
            condition: (data) => data.type === 'Champion',
          },
        },
        {
          name: 'character',
          type: 'relationship',
          admin: {
            condition: (data) => CHARACTER_TYPES.includes(data.type),
          },
          relationTo: 'characters',
          hasMany: false,
        },
        {
          name: 'might',
          type: 'number',
          admin: {
            condition: (data) => COMBAT_TYPES.includes(data.type),
          },
        },
      ],
    },
    {
      name: 'cost',
      type: 'number',
      label: 'Energy Cost',
      admin: {
        description: 'Exhaust Rune(s)',
        position: 'sidebar',
        condition: (data) => !RULES_TYPES.includes(data.type),
      },
      min: 0,
      max: 12,
    },
    {
      name: 'recycle',
      type: 'array',
      label: 'Power Cost',
      admin: {
        description: 'Recycle Rune(s)',
        position: 'sidebar',
        condition: (data) => !RULES_TYPES.includes(data.type),
      },
      fields: [
        {
          name: 'rune',
          type: 'select',
          hasMany: false,
          options: [
            'Any',
            'Calm',
            'Chaos',
            'Fury',
            'Mental',
            'Order',
            'Physical',
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'set_index',
          label: 'Set Number',
          type: 'number',
          required: true,
        },
        {
          name: 'set',
          type: 'relationship',
          relationTo: 'sets',
          hasMany: false,
          required: true,
        },
        {
          name: 'rarity',
          type: 'select',
          options: [
            'White Circle',
            'Green Triangle',
            'Purple Diamond',
            'Golden Pentagon',
          ],
          required: true,
        },
      ],
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Art',
          fields: [
            {
              name: 'artist',
              type: 'relationship',
              relationTo: 'artists',
              hasMany: false,
            },
            {
              name: 'card_art',
              type: 'upload',
              label: 'Card Art',
              relationTo: 'media',
              hasMany: false,
            },
          ],
        },
        {
          label: 'Abilities',
          fields: [
            {
              type: 'row',
              admin: {
                condition: (data) => !SIMPLE_TYPES.includes(data.type),
              },
              fields: [
                {
                  name: 'keywords',
                  type: 'relationship',
                  relationTo: 'keywords',
                  hasMany: true,
                },
                {
                  name: 'tags',
                  type: 'relationship',
                  relationTo: 'tags',
                  hasMany: true,
                },
              ],
            },
            {
              name: 'abilities',
              label: 'Rules Text',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ defaultFeatures }) => [
                  ...defaultFeatures,
                  FixedToolbarFeature(),
                ],
              }),
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, req }) => {
        let full_card_name = '';
        if (data.subtitle) {
          full_card_name = `${data.name}, ${data.subtitle}`;
        } else if (data.character) {
          const result = await req.payload.findByID({
            collection: 'characters',
            id: data.character,
          });
          full_card_name = `${data.name} (${result.name})`;
        } else {
          full_card_name = `${data.name}`;
        }
        return {
          ...data,
          full_card_name,
        };
      },
    ],
  },
};
