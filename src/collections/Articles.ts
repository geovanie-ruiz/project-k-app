import type { CollectionConfig } from 'payload';

import { isAdminAuthorOrPublished } from '@/access/isAdminAuthorOrPublished';
import { isAdminOrAuthor } from '@/access/isAdminOrAuthor';
import { isCollaborator } from '@/access/isCollaborator';
import { PrettyIconsFeature } from '@/utils/lexical/features/pretty-icons/server';
import {
  FixedToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical';
import { formatSlug } from './hooks/formatSlug';

export const Articles: CollectionConfig = {
  slug: 'articles',
  access: {
    create: isCollaborator,
    delete: isAdminOrAuthor,
    read: isAdminAuthorOrPublished,
    update: isAdminOrAuthor,
  },
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'category', 'updated_at'],
    livePreview: {
      url: ({ req, data }) => {
        return `${req.protocol}//${req.host}/articles/${data.slug}?preview=true`;
      },
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      required: true,
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      hasMany: false,
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ value, operation, req }) => {
            if (operation === 'create') {
              return req.user?.id;
            }
            return value;
          },
        ],
      },
    },
    {
      name: 'slug',
      type: 'text',
      index: true,
      label: 'Slug',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
      unique: true,
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date();
            }
            return value;
          },
        ],
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Cover Image',
          fields: [
            {
              name: 'coverImage',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
          ],
        },
        {
          label: 'Content',
          fields: [
            {
              name: 'content',
              type: 'richText',
              required: true,
              editor: lexicalEditor({
                features: ({ defaultFeatures }) => [
                  ...defaultFeatures,
                  FixedToolbarFeature(),
                  PrettyIconsFeature(),
                ],
              }),
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [formatSlug],
  },
  labels: {
    plural: 'Articles',
    singular: 'Article',
  },
  versions: {
    drafts: {
      autosave: {
        interval: 375,
      },
    },
  },
};
