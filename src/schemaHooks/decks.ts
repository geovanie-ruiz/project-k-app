import { tsVector } from '@/utils/types/drizzle.types';
import { sql } from '@payloadcms/db-postgres';
import { SQL } from '@payloadcms/db-postgres/drizzle';
import { index } from '@payloadcms/db-postgres/drizzle/pg-core';
import { PostgresSchemaHook } from '@payloadcms/drizzle/postgres';

export const DecksTableExpansion: PostgresSchemaHook = ({
  schema,
  extendTable,
}) => {
  extendTable({
    table: schema.tables.decks,
    columns: {
      deckNameVector: tsVector('deck_name_vector', {
        dimensions: 3,
      }).generatedAlwaysAs(
        (): SQL => sql`to_tsvector('english', ${schema.tables.decks.name})`
      ),
    },
    extraConfig: (table) => ({
      decks_name_search_idx: index('decks_name_search_idx').using(
        'gin',
        table.deckNameVector
      ),
    }),
  });

  return schema;
};
