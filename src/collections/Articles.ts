import type { CollectionConfig } from 'payload';

import { isAdmin } from '@/access/isAdmin';
import { isAdminOrAuthor } from '@/access/isAdminOrAuthor';
import { isCollaborator } from '@/access/isCollaborator';
import {
  FixedToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical';
import { formatSlug } from './hooks/formatSlug';

export const Articles: CollectionConfig = {
  slug: 'articles',
  access: {
    create: isCollaborator,
    delete: isAdmin,
    read: () => true,
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
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: false,
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
