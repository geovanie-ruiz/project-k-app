import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "cards" ALTER COLUMN "flavor" SET DATA TYPE varchar;
  ALTER TABLE "sets" ALTER COLUMN "set_code" SET NOT NULL;
  ALTER TABLE "sets" ALTER COLUMN "total" SET NOT NULL;
  ALTER TABLE "decks" ALTER COLUMN "public" SET NOT NULL;
  ALTER TABLE "articles" ADD COLUMN "article_search_vector" "tsvector" GENERATED ALWAYS AS (to_tsvector('english', "articles"."title" || ' ' || "articles"."excerpt")) STORED;
  ALTER TABLE "cards" ADD COLUMN "card_name_vector" "tsvector" GENERATED ALWAYS AS (to_tsvector('english', "cards"."full_card_name")) STORED;
  ALTER TABLE "cards" ADD COLUMN "card_text_vector" "tsvector" GENERATED ALWAYS AS (to_tsvector('english', "cards"."abilities_text")) STORED;
  ALTER TABLE "cards" ADD COLUMN "card_name_text_vector" "tsvector" GENERATED ALWAYS AS (to_tsvector('english', "cards"."full_card_name" || ' ' || "cards"."abilities_text")) STORED;
  ALTER TABLE "decks" ADD COLUMN "likes" numeric DEFAULT 0 NOT NULL;
  ALTER TABLE "decks" ADD COLUMN "preview" varchar NOT NULL;
  ALTER TABLE "decks" ADD COLUMN "deck_name_vector" "tsvector" GENERATED ALWAYS AS (to_tsvector('english', "decks"."name")) STORED;
  CREATE INDEX IF NOT EXISTS "articles_search_idx" ON "articles" USING gin ("article_search_vector");
  CREATE INDEX IF NOT EXISTS "cards_name_search_idx" ON "cards" USING gin ("card_name_vector");
  CREATE INDEX IF NOT EXISTS "cards_card_text_search_idx" ON "cards" USING gin ("card_text_vector");
  CREATE INDEX IF NOT EXISTS "cards_card_name_text_search_idx" ON "cards" USING gin ("card_name_text_vector");
  CREATE INDEX IF NOT EXISTS "decks_name_search_idx" ON "decks" USING gin ("deck_name_vector");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX IF EXISTS "articles_search_idx";
  DROP INDEX IF EXISTS "cards_name_search_idx";
  DROP INDEX IF EXISTS "cards_card_text_search_idx";
  DROP INDEX IF EXISTS "cards_card_name_text_search_idx";
  DROP INDEX IF EXISTS "decks_name_search_idx";
  ALTER TABLE "cards" ALTER COLUMN "flavor" SET DATA TYPE jsonb;
  ALTER TABLE "sets" ALTER COLUMN "set_code" DROP NOT NULL;
  ALTER TABLE "sets" ALTER COLUMN "total" DROP NOT NULL;
  ALTER TABLE "decks" ALTER COLUMN "public" DROP NOT NULL;
  ALTER TABLE "articles" DROP COLUMN IF EXISTS "article_search_vector";
  ALTER TABLE "cards" DROP COLUMN IF EXISTS "card_name_vector";
  ALTER TABLE "cards" DROP COLUMN IF EXISTS "card_text_vector";
  ALTER TABLE "cards" DROP COLUMN IF EXISTS "card_name_text_vector";
  ALTER TABLE "decks" DROP COLUMN IF EXISTS "likes";
  ALTER TABLE "decks" DROP COLUMN IF EXISTS "preview";
  ALTER TABLE "decks" DROP COLUMN IF EXISTS "deck_name_vector";`)
}
