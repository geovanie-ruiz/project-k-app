import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "cards" ADD COLUMN "recycle_serial" varchar;
  ALTER TABLE "sets" ADD COLUMN "description" varchar;
  ALTER TABLE "public"."users_links" ALTER COLUMN "site" SET DATA TYPE text;
  DROP TYPE "public"."enum_users_links_site";
  CREATE TYPE "public"."enum_users_links_site" AS ENUM('Blog', 'Bluesky', 'Discord', 'Mobalytics', 'OP.GG', 'Podcast', 'TCGplayer', 'TikTok', 'Twitch', 'YouTube');
  ALTER TABLE "public"."users_links" ALTER COLUMN "site" SET DATA TYPE "public"."enum_users_links_site" USING "site"::"public"."enum_users_links_site";`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "cards" DROP COLUMN IF EXISTS "recycle_serial";
  ALTER TABLE "sets" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "public"."users_links" ALTER COLUMN "site" SET DATA TYPE text;
  DROP TYPE "public"."enum_users_links_site";
  CREATE TYPE "public"."enum_users_links_site" AS ENUM('Blog', 'Discord', 'Instagram', 'Mobalytics', 'OP.GG', 'Podcast', 'TCGplayer', 'TikTok', 'Twitch', 'Twitter (X)', 'YouTube');
  ALTER TABLE "public"."users_links" ALTER COLUMN "site" SET DATA TYPE "public"."enum_users_links_site" USING "site"::"public"."enum_users_links_site";`);
}
