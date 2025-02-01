import type { CollectionConfig } from 'payload';

import { isAdmin } from '@/access/isAdmin';
import { isCollaborator } from '@/access/isCollaborator';
import { Card, Recycle } from '@/payload-types';
import { PrettyIconsFeature } from '@/utils/lexical/features/pretty-icons/server';
import { PrettyKeywordsFeature } from '@/utils/lexical/features/pretty-keywords/server';
import { lexicalToPlaintext } from '@/utils/lexical/utils/lexicalToPlaintext';
import {
  ALL_RUNE_TYPES,
  CARD_TYPES,
  CHARACTER_TYPES,
  COMBAT_TYPES,
  RARITIES,
  RULES_TYPES,
  RUNE_TYPES,
  SIMPLE_TYPES,
} from '@/utils/types/cards.types';
import {
  FixedToolbarFeature,
  HeadingFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical';
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';

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
      interfaceName: 'Recycle',
      fields: [
        {
          name: 'rune',
          type: 'select',
          hasMany: false,
          options: ALL_RUNE_TYPES,
        },
      ],
    },
    {
      name: 'recycle_serial',
      type: 'text',
      admin: {
        readOnly: true,
        hidden: true,
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Details',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  label: 'Card Type',
                  name: 'type',
                  type: 'select',
                  hasMany: false,
                  options: CARD_TYPES,
                  required: true,
                },
                {
                  name: 'rune',
                  type: 'select',
                  hasMany: true,
                  options: RUNE_TYPES,
                  admin: {
                    condition: (data) =>
                      !!data.type && data.type !== 'Battlefield',
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
                  options: RARITIES,
                  required: true,
                },
              ],
            },
          ],
        },
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
                  HeadingFeature({
                    enabledHeadingSizes: ['h2', 'h3', 'h4', 'h5', 'h6'],
                  }),
                  PrettyIconsFeature(),
                  PrettyKeywordsFeature(),
                ],
              }),
            },
            {
              name: 'abilities_text',
              type: 'text',
              admin: {
                hidden: true,
              },
              defaultValue: '',
            },
          ],
        },
        {
          label: 'Flavor',
          fields: [
            {
              name: 'flavor',
              label: 'Flavor Text',
              type: 'textarea',
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
        if (data.type === 'Champion') {
          full_card_name = `${data.name}, ${data.subtitle}`;
        } else if (CHARACTER_TYPES.includes(data.type)) {
          const character = await req.payload.findByID({
            collection: 'characters',
            id: data.character,
          });
          full_card_name = `${data.name} (${character.name})`;
        } else {
          full_card_name = `${data.name}`;
        }
        return {
          ...data,
          full_card_name,
        };
      },
      async ({ data, req }) => {
        if (!data.abilities) return { ...data };

        const convertedAbilities = await lexicalToPlaintext(
          data.abilities as SerializedEditorState,
          req.payload.config
        );

        return {
          ...data,
          abilities_text: convertedAbilities,
        };
      },
      async ({ data }) => {
        const recycle: Recycle = data.recycle;
        if (!recycle || recycle.length === 0) return { ...data };
        const runes = recycle.map(
          (rune) => rune?.rune?.at(0)?.toLowerCase() || ''
        );
        return {
          ...data,
          recycle_serial: runes.filter((rune) => rune !== '').join(''),
        };
      },
    ],
  },
};
