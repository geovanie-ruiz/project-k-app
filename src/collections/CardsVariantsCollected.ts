import type { CollectionConfig } from 'payload';

export const CardsVariantsCollected: CollectionConfig = {
  slug: 'cards-variants-collected',
  admin: {
    hidden: true,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'user',
          type: 'relationship',
          relationTo: 'users',
          hasMany: false,
          required: true,
        },
        {
          name: 'variant',
          type: 'relationship',
          relationTo: 'cards-variants',
          hasMany: false,
          required: true,
        },
        {
          name: 'quantity',
          type: 'number',
          defaultValue: 0,
        },
      ],
    },
  ],
};
