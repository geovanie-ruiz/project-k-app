import { isAdminOrAuthor } from '@/access/isAdminOrAuthor';
import { isAuthenticated } from '@/access/isAuthenticated';
import { checkRole } from '@/utils/roles';
import { EVENT_TYPES } from '@/utils/types/events.types';
import { CollectionConfig } from 'payload';

export const CommunityEvents: CollectionConfig = {
  slug: 'events',
  access: {
    create: isAuthenticated,
    delete: isAdminOrAuthor,
    read: () => true,
    update: isAdminOrAuthor,
  },
  admin: {
    group: 'User Content',
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'contributor',
      label: 'Contributor',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      hasMany: false,
      admin: {
        position: 'sidebar',
      },
      access: {
        create: () => false,
        read: () => checkRole('admin'),
        update: () => checkRole('admin'),
      },
      defaultValue: ({ user }) => user,
    },
    {
      name: 'approved',
      label: 'Approved',
      type: 'checkbox',
      access: {
        create: () => checkRole('admin'),
        read: () => true,
        update: () => checkRole('admin'),
      },
      admin: {
        position: 'sidebar',
        description:
          'Events must be approved before appearing on the community calendar.',
      },
      defaultValue: false,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          label: 'Event Title',
          type: 'text',
          required: true,
        },
        {
          name: 'start_date',
          label: 'Start Date',
          type: 'date',
          required: true,
        },
        {
          name: 'end_date',
          label: 'End Date',
          type: 'date',
          required: true,
        },
        {
          name: 'type',
          label: 'Event Type',
          type: 'select',
          options: EVENT_TYPES,
          hasMany: false,
          required: true,
        },
      ],
    },
    {
      name: 'description',
      label: 'Event Description',
      type: 'textarea',
      required: true,
      admin: {
        placeholder: 'What is supposed to occur at this event?',
      },
    },
  ],
};
