import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_events_type" AS ENUM('Community Event', 'National Tournament', 'Pre-Release', 'Regional Tournament', 'Release', 'Special Event', 'World Tournament');
  CREATE TABLE IF NOT EXISTS "events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"contributor_id" integer NOT NULL,
  	"approved" boolean DEFAULT false,
  	"title" varchar NOT NULL,
  	"start_date" timestamp(3) with time zone NOT NULL,
  	"end_date" timestamp(3) with time zone NOT NULL,
  	"type" "enum_events_type" NOT NULL,
  	"description" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "articles" ADD COLUMN "author_name" varchar;
  ALTER TABLE "_articles_v" ADD COLUMN "version_author_name" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "events_id" integer;
  DO $$ BEGIN
   ALTER TABLE "events" ADD CONSTRAINT "events_contributor_id_users_id_fk" FOREIGN KEY ("contributor_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "events_contributor_idx" ON "events" USING btree ("contributor_id");
  CREATE INDEX IF NOT EXISTS "events_updated_at_idx" ON "events" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "events_created_at_idx" ON "events" USING btree ("created_at");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_events_id_idx" ON "payload_locked_documents_rels" USING btree ("events_id");`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "events" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "events" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_events_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_events_id_idx";
  ALTER TABLE "articles" DROP COLUMN IF EXISTS "author_name";
  ALTER TABLE "_articles_v" DROP COLUMN IF EXISTS "version_author_name";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "events_id";
  DROP TYPE "public"."enum_events_type";`);
}
