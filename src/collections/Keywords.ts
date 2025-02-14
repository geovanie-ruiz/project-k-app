import type { CollectionConfig } from 'payload';

import { isAdmin } from '@/access/isAdmin';
import { isCollaborator } from '@/access/isCollaborator';
import { PrettyIconsFeature } from '@/utils/lexical/features/pretty-icons/server';
import { PrettyKeywordsFeature } from '@/utils/lexical/features/pretty-keywords/server';
import { lexicalToDiscord } from '@/utils/lexical/utils/lexicalToDiscord';
import { lexicalToPlaintext } from '@/utils/lexical/utils/lexicalToPlaintext';
import { KeywordTypes } from '@/utils/types/keywords.types';
import {
  FixedToolbarFeature,
  HeadingFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical';
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import updateKeywordType from './hooks/updateKeywordType';

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
      type: 'row',
      fields: [
        {
          name: 'keyword',
          type: 'text',
        },
        {
          name: 'type',
          type: 'select',
          label: 'Keyword Type',
          options: KeywordTypes,
          hooks: {
            beforeChange: [updateKeywordType],
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'position',
          type: 'select',
          options: [
            {
              label: 'Before Abilities',
              value: 'prefix',
            },
            {
              label: 'After Abilities',
              value: 'suffix',
            },
          ],
          defaultValue: 'prefix',
        },
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
            {
              label: 'Timing Grey',
              value: '#536878',
            },
            {
              label: 'Trigger Gold',
              value: '#8F7236',
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
          HeadingFeature({
            enabledHeadingSizes: ['h2', 'h3', 'h4', 'h5', 'h6'],
          }),
          PrettyIconsFeature(),
          PrettyKeywordsFeature(),
        ],
      }),
    },
    {
      name: 'reminder_plaintext',
      type: 'text',
      admin: {
        hidden: true,
      },
      defaultValue: '',
    },
    {
      name: 'reminder_markup',
      type: 'text',
      admin: {
        hidden: true,
      },
      defaultValue: '',
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, req }) => {
        if (!data.reminder_text) return { ...data };

        const reminderToText = await lexicalToPlaintext(
          data.reminder_text as SerializedEditorState,
          req.payload.config
        );

        const reminderToMarkup = await lexicalToDiscord(
          data.reminder_text as SerializedEditorState,
          req.payload.config
        );

        return {
          ...data,
          reminder_plaintext: reminderToText,
          reminder_markup: reminderToMarkup,
        };
      },
    ],
  },
};
