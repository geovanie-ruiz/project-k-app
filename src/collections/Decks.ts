import type { CollectionConfig } from 'payload';

import { isAdminAuthorOrPublic } from '@/access/isAdminAuthorOrPublic';
import { isAdminOrAuthor } from '@/access/isAdminOrAuthor';
import { isAuthenticated } from '@/access/isAuthenticated';
import { PrettyIconsFeature } from '@/utils/lexical/features/pretty-icons/server';
import { PrettyKeywordsFeature } from '@/utils/lexical/features/pretty-keywords/server';
import {
  FixedToolbarFeature,
  HeadingFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical';
import ShortUniqueId from 'short-unique-id';

export const Decks: CollectionConfig = {
  slug: 'decks',
  access: {
    create: isAuthenticated,
    delete: isAdminOrAuthor,
    read: isAdminAuthorOrPublic,
    update: isAdminOrAuthor,
  },
  admin: {
    group: 'User Content',
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'author',
      label: 'Deck Owner',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      hasMany: false,
      admin: {
        readOnly: true,
      },
      defaultValue: ({ user }) => user,
    },
    {
      name: 'name',
      label: 'Deck Name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
      defaultValue: () => {
        const uid = new ShortUniqueId({ length: 18 });
        return uid.rnd();
      },
      unique: true,
    },
    {
      name: 'public',
      label: 'Public',
      type: 'checkbox',
      admin: {
        position: 'sidebar',
      },
      defaultValue: false,
    },
    {
      name: 'likes',
      label: 'Likes',
      type: 'number',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
      defaultValue: 0,
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
    },
    {
      name: 'highlights',
      type: 'array',
      maxRows: 3,
      fields: [
        {
          name: 'highlight',
          type: 'relationship',
          relationTo: 'cards',
          hasMany: false,
        },
      ],
    },
    {
      name: 'guide',
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
      name: 'cardlist',
      type: 'array',
      fields: [
        {
          name: 'card',
          type: 'relationship',
          relationTo: 'cards',
          hasMany: false,
        },
        {
          name: 'quantity',
          type: 'number',
        },
      ],
    },
  ],
};
