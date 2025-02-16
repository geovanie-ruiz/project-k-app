import type { CollectionConfig } from 'payload';

import { isAdmin } from '@/access/isAdmin';
import { isCollaborator } from '@/access/isCollaborator';
import { Rarity } from '@/utils/types/cards.types';

export const Variants: CollectionConfig = {
  slug: 'variants',
  access: {
    create: isCollaborator,
    delete: isAdmin,
    read: () => true,
    update: isCollaborator,
  },
  admin: {
    group: 'Library',
    useAsTitle: 'full_variant_name',
    defaultColumns: ['full_variant_name', 'rarity'],
  },
  fields: [
    {
      name: 'full_variant_name',
      type: 'text',
      label: 'Full Variant Name',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            if (siblingData.rarity === Rarity.NONE) return 'Basic';
            if (siblingData.rarity === Rarity.PROMO) return 'Promo';
            if (!siblingData.name || siblingData.name === '')
              return `${siblingData.rarity}`;
            return `${siblingData.name} ${siblingData.rarity}`;
          },
        ],
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          label: 'Variant Name',
          type: 'text',
        },
        {
          name: 'rarity',
          type: 'select',
          options: Object.values(Rarity),
          required: true,
        },
      ],
    },
  ],
};
