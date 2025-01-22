import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "users_links" ALTER COLUMN "site" SET NOT NULL;
  ALTER TABLE "users_links" ALTER COLUMN "url" SET NOT NULL;
  ALTER TABLE "articles" ADD COLUMN IF NOT EXISTS "excerpt" varchar;
  ALTER TABLE "_articles_v" ADD COLUMN IF NOT EXISTS "version_excerpt" varchar;
  ALTER TABLE "cards" ADD COLUMN "abilities_text" varchar;
  ALTER TABLE "cards" ADD COLUMN "flavor" jsonb;`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "users_links" ALTER COLUMN "site" DROP NOT NULL;
  ALTER TABLE "users_links" ALTER COLUMN "url" DROP NOT NULL;
  ALTER TABLE "articles" DROP COLUMN IF EXISTS "excerpt";
  ALTER TABLE "_articles_v" DROP COLUMN IF EXISTS "version_excerpt";
  ALTER TABLE "cards" DROP COLUMN IF EXISTS "abilities_text";
  ALTER TABLE "cards" DROP COLUMN IF EXISTS "flavor";`);
}
