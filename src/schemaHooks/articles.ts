import { tsVector } from '@/utils/types/drizzle.types';
import { sql } from '@payloadcms/db-postgres';
import { SQL } from '@payloadcms/db-postgres/drizzle';
import { index } from '@payloadcms/db-postgres/drizzle/pg-core';
import { PostgresSchemaHook } from '@payloadcms/drizzle/postgres';

export const ArticlesTableExpansion: PostgresSchemaHook = ({
  schema,
  extendTable,
}) => {
  extendTable({
    table: schema.tables.articles,
    columns: {
      articleSearchVector: tsVector('article_search_vector', {
        dimensions: 3,
      }).generatedAlwaysAs(
        (): SQL =>
          sql`to_tsvector('english', ${schema.tables.cards.title} || ' ' || ${schema.tables.cards.excerpt})`
      ),
    },
    extraConfig: (table) => ({
      articles_search_idx: index('articles_search_idx').using(
        'gin',
        table.articleSearchVector
      ),
    }),
  });

  return schema;
};
