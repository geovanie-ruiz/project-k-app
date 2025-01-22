import type { CollectionConfig } from 'payload';

import { isAdmin } from '@/access/isAdmin';
import { isCollaborator } from '@/access/isCollaborator';
import { PrettyIconsFeature } from '@/utils/lexical/features/pretty-icons/server';
import { PrettyKeywordsFeature } from '@/utils/lexical/features/pretty-keywords/server';
import {
  FixedToolbarFeature,
  HeadingFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical';

export const Spoilers: CollectionConfig = {
  slug: 'spoilers',
  access: {
    create: isCollaborator,
    delete: isAdmin,
    read: () => true,
    update: isCollaborator,
  },
  admin: {
    group: 'Library',
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
    },
    {
      label: 'Source Link',
      name: 'source_url',
      type: 'text',
      required: true,
    },
    {
      label: 'Source Information',
      name: 'source_description',
      type: 'text',
      required: true,
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
        },
        {
          name: 'rune',
          type: 'select',
          hasMany: true,
          options: ['Calm', 'Chaos', 'Fury', 'Mental', 'Order', 'Physical'],
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
        },
        {
          name: 'subtitle',
          type: 'text',
        },
        {
          name: 'character',
          type: 'relationship',
          relationTo: 'characters',
          hasMany: false,
        },
        {
          name: 'might',
          type: 'number',
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
      },
    },
    {
      name: 'recycle',
      type: 'array',
      label: 'Power Cost',
      admin: {
        description: 'Recycle Rune(s)',
        position: 'sidebar',
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
      name: 'card',
      type: 'relationship',
      relationTo: 'cards',
      hasMany: false,
      admin: {
        description: 'The card spoiled',
        position: 'sidebar',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'set_index',
          label: 'Set Number',
          type: 'number',
        },
        {
          name: 'set',
          type: 'relationship',
          relationTo: 'sets',
          hasMany: false,
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
                  HeadingFeature({
                    enabledHeadingSizes: ['h2', 'h3', 'h4', 'h5', 'h6'],
                  }),
                  PrettyIconsFeature(),
                  PrettyKeywordsFeature(),
                ],
              }),
            },
          ],
        },
      ],
    },
  ],
};
