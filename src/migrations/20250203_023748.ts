import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "cards" ADD COLUMN "abilities_markup" varchar DEFAULT '';
  ALTER TABLE "keywords" ADD COLUMN "reminder_plaintext" varchar DEFAULT '';
  ALTER TABLE "keywords" ADD COLUMN "reminder_markup" varchar DEFAULT '';`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "cards" DROP COLUMN IF EXISTS "abilities_markup";
  ALTER TABLE "keywords" DROP COLUMN IF EXISTS "reminder_plaintext";
  ALTER TABLE "keywords" DROP COLUMN IF EXISTS "reminder_markup";`);
}
