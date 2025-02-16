import type { CollectionConfig } from 'payload';

export const CardsVariants: CollectionConfig = {
  slug: 'cards-variants',
  admin: {
    hidden: true,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'card',
          type: 'relationship',
          relationTo: 'cards',
          hasMany: false,
          required: true,
        },
        {
          name: 'variant',
          type: 'relationship',
          relationTo: 'variants',
          hasMany: false,
          required: true,
        },
        {
          name: 'defaultVariant',
          type: 'checkbox',
          label: 'Base Variant',
          admin: {
            description:
              'Indicates this variant is the de facto variant of the card.',
          },
          defaultValue: false,
        },
      ],
    },
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
      required: true,
    },
  ],
};
