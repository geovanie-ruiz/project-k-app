import { tsVector } from '@/utils/types/drizzle.types';
import { sql } from '@payloadcms/db-postgres';
import { SQL } from '@payloadcms/db-postgres/drizzle';
import { index } from '@payloadcms/db-postgres/drizzle/pg-core';
import { PostgresSchemaHook } from '@payloadcms/drizzle/postgres';

export const CardsTableExpansion: PostgresSchemaHook = ({
  schema,
  extendTable,
}) => {
  extendTable({
    table: schema.tables.cards,
    columns: {
      cardNameVector: tsVector('card_name_vector', {
        dimensions: 3,
      }).generatedAlwaysAs(
        (): SQL =>
          sql`to_tsvector('english', ${schema.tables.cards.full_card_name})`
      ),
      cardTextVector: tsVector('card_text_vector', {
        dimensions: 3,
      }).generatedAlwaysAs(
        (): SQL =>
          sql`to_tsvector('english', ${schema.tables.cards.abilities_text})`
      ),
      cardNameTextVector: tsVector('card_name_text_vector', {
        dimensions: 3,
      }).generatedAlwaysAs(
        (): SQL =>
          sql`to_tsvector('english', ${schema.tables.cards.full_card_name} || ' ' || ${schema.tables.cards.abilities_text})`
      ),
    },
    extraConfig: (table) => ({
      cards_name_search_idx: index('cards_name_search_idx').using(
        'gin',
        table.cardNameVector
      ),
      cards_card_text_search_idx: index('cards_card_text_search_idx').using(
        'gin',
        table.cardTextVector
      ),
      cards_card_name_text_search_idx: index(
        'cards_card_name_text_search_idx'
      ).using('gin', table.cardNameTextVector),
    }),
  });

  return schema;
};
