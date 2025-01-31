import { isAdminOrAuthor } from '@/access/isAdminOrAuthor';
import { isAuthenticated } from '@/access/isAuthenticated';
import {
  Card,
  CardCollection as CardCollectionType,
  Set as CardSet,
} from '@/payload-types';
import type { CollectionConfig, FilterOptionsProps } from 'payload';
import updateSetCompletionFieldHook from './hooks/updateSetCompletion';

interface SetRow {
  id: string;
  set: CardSet;
  cards: Card[];
  completion: string;
}
interface SetCard {
  id: string;
  foil: number;
  card: Card;
  normal: number;
}

export const CardCollection: CollectionConfig = {
  slug: 'card-collection',
  access: {
    create: isAuthenticated,
    delete: isAdminOrAuthor,
    read: isAdminOrAuthor,
    update: isAdminOrAuthor,
  },
  admin: {
    group: 'User Content',
    useAsTitle: 'id',
  },
  fields: [
    {
      name: 'owner',
      label: 'Collection Owner',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      hasMany: false,
      access: {
        read: () => false,
      },
      admin: {
        readOnly: true,
      },
      defaultValue: ({ user }) => user,
    },
    {
      name: 'sets',
      label: 'Set Completion',
      type: 'array',
      fields: [
        {
          name: 'set',
          type: 'relationship',
          relationTo: 'sets',
          hasMany: false,
        },
        {
          name: 'cards',
          type: 'array',
          fields: [
            {
              name: 'card',
              type: 'relationship',
              relationTo: 'cards',
              hasMany: false,
              filterOptions: ({
                data,
                siblingData,
              }: FilterOptionsProps<CardCollectionType>) => {
                if (!data.sets || data.sets.length === 0) return false;
                const setCard: SetCard = siblingData as SetCard;

                const set = data.sets.find((set) => {
                  if (!set.cards || set.cards.length === 0) return false;
                  return set.cards.find((card) => card.id === setCard.id);
                });

                if (!set || !set.set) return false;

                return {
                  set: {
                    equals: set.set,
                  },
                };
              },
            },
            {
              name: 'normal',
              type: 'number',
              defaultValue: 0,
              min: 0,
            },
            {
              name: 'foil',
              type: 'number',
              defaultValue: 0,
              min: 0,
            },
          ],
          validate: (value) => {
            if (!value || value.length === 0) return true;
            const values = (value as SetCard[]).map((row) => row.card);
            const hasDuplicates = new Set(values).size !== values.length;
            if (hasDuplicates) return 'Cards must be unique';
            return true;
          },
        },
        {
          name: 'completion',
          type: 'text',
          defaultValue: 'Not Started',
          admin: {
            readOnly: true,
            description:
              '(Field only updates on manual page reload; known issue)',
          },
          hooks: {
            beforeChange: [updateSetCompletionFieldHook],
          },
        },
      ],
      validate: (value) => {
        if (!value || value.length === 0) return true;
        const values = (value as SetRow[]).map((row) => row.set);
        const hasDuplicates = new Set(values).size !== values.length;
        if (hasDuplicates) return 'Sets must be unique';
        return true;
      },
    },
  ],
};
