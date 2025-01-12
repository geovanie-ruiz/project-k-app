import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_articles_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__articles_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_cards_recycle_rune" AS ENUM('Any', 'Calm', 'Chaos', 'Fury', 'Mental', 'Order', 'Physical');
  CREATE TYPE "public"."enum_cards_rune" AS ENUM('Calm', 'Chaos', 'Fury', 'Mental', 'Order', 'Physical');
  CREATE TYPE "public"."enum_cards_type" AS ENUM('Unit', 'Champion', 'Legend', 'Spell', 'Battlefield', 'Gear', 'Rune');
  CREATE TYPE "public"."enum_cards_rarity" AS ENUM('None', 'White Circle', 'Green Triangle', 'Purple Diamond', 'Golden Pentagon', 'Promo');
  CREATE TYPE "public"."enum_keywords_type" AS ENUM('Effect', 'Timing', 'Trigger');
  CREATE TYPE "public"."enum_keywords_position" AS ENUM('prefix', 'suffix');
  CREATE TYPE "public"."enum_keywords_color" AS ENUM('#699667', '#835b86', '#a74e56', '#566f94', '#ab972c', '#ba7152', '#536878', '#8F7236');
  CREATE TYPE "public"."enum_spoilers_rune" AS ENUM('Calm', 'Chaos', 'Fury', 'Mental', 'Order', 'Physical');
  CREATE TYPE "public"."enum_spoilers_recycle_rune" AS ENUM('Any', 'Calm', 'Chaos', 'Fury', 'Mental', 'Order', 'Physical');
  CREATE TYPE "public"."enum_spoilers_type" AS ENUM('Unit', 'Champion', 'Legend', 'Spell', 'Battlefield', 'Gear', 'Rune');
  CREATE TYPE "public"."enum_spoilers_rarity" AS ENUM('White Circle', 'Green Triangle', 'Purple Diamond', 'Golden Pentagon');
  CREATE TYPE "public"."enum_users_links_site" AS ENUM('Blog', 'Discord', 'Instagram', 'Mobalytics', 'OP.GG', 'Podcast', 'TCGplayer', 'TikTok', 'Twitch', 'Twitter (X)', 'YouTube');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'creator', 'user');
  CREATE TABLE IF NOT EXISTS "articles" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"author_id" integer,
  	"slug" varchar,
  	"published_at" timestamp(3) with time zone,
  	"cover_image_id" integer,
  	"content" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_articles_status" DEFAULT 'draft'
  );
  
  CREATE TABLE IF NOT EXISTS "articles_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "_articles_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_author_id" integer,
  	"version_slug" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_cover_image_id" integer,
  	"version_content" jsonb,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__articles_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_articles_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "artists" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "cards_recycle" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"rune" "enum_cards_recycle_rune"
  );
  
  CREATE TABLE IF NOT EXISTS "cards_rune" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_cards_rune",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "cards" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"full_card_name" varchar,
  	"cost" numeric,
  	"type" "enum_cards_type" NOT NULL,
  	"name" varchar NOT NULL,
  	"subtitle" varchar,
  	"character_id" integer,
  	"might" numeric,
  	"set_index" numeric NOT NULL,
  	"set_id" integer NOT NULL,
  	"rarity" "enum_cards_rarity" NOT NULL,
  	"artist_id" integer,
  	"card_art_id" integer,
  	"abilities" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "cards_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"keywords_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "characters" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "keywords" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"keyword" varchar,
  	"type" "enum_keywords_type",
  	"position" "enum_keywords_position" DEFAULT 'prefix',
  	"color" "enum_keywords_color",
  	"reminder_text" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "sets" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"released_at" timestamp(3) with time zone,
  	"set_code" varchar,
  	"total" numeric,
  	"collectible" numeric,
  	"key_art_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "spoilers_rune" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_spoilers_rune",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "spoilers_recycle" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"rune" "enum_spoilers_recycle_rune"
  );
  
  CREATE TABLE IF NOT EXISTS "spoilers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"source_url" varchar NOT NULL,
  	"source_description" varchar NOT NULL,
  	"type" "enum_spoilers_type",
  	"name" varchar,
  	"subtitle" varchar,
  	"character_id" integer,
  	"might" numeric,
  	"cost" numeric,
  	"card_id" integer,
  	"set_index" numeric,
  	"set_id" integer,
  	"rarity" "enum_spoilers_rarity",
  	"artist_id" integer,
  	"card_art_id" integer,
  	"abilities" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "spoilers_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"keywords_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "tags" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"region" boolean DEFAULT false,
  	"tag" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "users_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"site" "enum_users_links_site",
  	"url" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"email" varchar,
  	"username" varchar,
  	"clerk_id" varchar,
  	"role" "enum_users_role",
  	"author_name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "decks_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"highlight_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "decks_cardlist" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"card_id" integer,
  	"quantity" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "decks" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"author_id" integer NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar,
  	"public" boolean DEFAULT false,
  	"guide" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "decks_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tags_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "card_collection_sets_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"card_id" integer,
  	"normal" numeric DEFAULT 0,
  	"foil" numeric DEFAULT 0
  );
  
  CREATE TABLE IF NOT EXISTS "card_collection_sets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"set_id" integer,
  	"completion" varchar DEFAULT 'Not Started'
  );
  
  CREATE TABLE IF NOT EXISTS "card_collection" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"owner_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"articles_id" integer,
  	"artists_id" integer,
  	"cards_id" integer,
  	"categories_id" integer,
  	"characters_id" integer,
  	"keywords_id" integer,
  	"media_id" integer,
  	"sets_id" integer,
  	"spoilers_id" integer,
  	"tags_id" integer,
  	"users_id" integer,
  	"decks_id" integer,
  	"card_collection_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  DO $$ BEGIN
   ALTER TABLE "articles" ADD CONSTRAINT "articles_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "articles" ADD CONSTRAINT "articles_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_parent_id_articles_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."articles"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_version_author_id_users_id_fk" FOREIGN KEY ("version_author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_articles_v_rels" ADD CONSTRAINT "_articles_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_articles_v_rels" ADD CONSTRAINT "_articles_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "cards_recycle" ADD CONSTRAINT "cards_recycle_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cards"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "cards_rune" ADD CONSTRAINT "cards_rune_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."cards"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "cards" ADD CONSTRAINT "cards_character_id_characters_id_fk" FOREIGN KEY ("character_id") REFERENCES "public"."characters"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "cards" ADD CONSTRAINT "cards_set_id_sets_id_fk" FOREIGN KEY ("set_id") REFERENCES "public"."sets"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "cards" ADD CONSTRAINT "cards_artist_id_artists_id_fk" FOREIGN KEY ("artist_id") REFERENCES "public"."artists"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "cards" ADD CONSTRAINT "cards_card_art_id_media_id_fk" FOREIGN KEY ("card_art_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "cards_rels" ADD CONSTRAINT "cards_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."cards"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "cards_rels" ADD CONSTRAINT "cards_rels_keywords_fk" FOREIGN KEY ("keywords_id") REFERENCES "public"."keywords"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "cards_rels" ADD CONSTRAINT "cards_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "sets" ADD CONSTRAINT "sets_key_art_id_media_id_fk" FOREIGN KEY ("key_art_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "spoilers_rune" ADD CONSTRAINT "spoilers_rune_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."spoilers"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "spoilers_recycle" ADD CONSTRAINT "spoilers_recycle_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."spoilers"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "spoilers" ADD CONSTRAINT "spoilers_character_id_characters_id_fk" FOREIGN KEY ("character_id") REFERENCES "public"."characters"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "spoilers" ADD CONSTRAINT "spoilers_card_id_cards_id_fk" FOREIGN KEY ("card_id") REFERENCES "public"."cards"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "spoilers" ADD CONSTRAINT "spoilers_set_id_sets_id_fk" FOREIGN KEY ("set_id") REFERENCES "public"."sets"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "spoilers" ADD CONSTRAINT "spoilers_artist_id_artists_id_fk" FOREIGN KEY ("artist_id") REFERENCES "public"."artists"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "spoilers" ADD CONSTRAINT "spoilers_card_art_id_media_id_fk" FOREIGN KEY ("card_art_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "spoilers_rels" ADD CONSTRAINT "spoilers_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."spoilers"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "spoilers_rels" ADD CONSTRAINT "spoilers_rels_keywords_fk" FOREIGN KEY ("keywords_id") REFERENCES "public"."keywords"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "spoilers_rels" ADD CONSTRAINT "spoilers_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "users_links" ADD CONSTRAINT "users_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "decks_highlights" ADD CONSTRAINT "decks_highlights_highlight_id_cards_id_fk" FOREIGN KEY ("highlight_id") REFERENCES "public"."cards"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "decks_highlights" ADD CONSTRAINT "decks_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."decks"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "decks_cardlist" ADD CONSTRAINT "decks_cardlist_card_id_cards_id_fk" FOREIGN KEY ("card_id") REFERENCES "public"."cards"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "decks_cardlist" ADD CONSTRAINT "decks_cardlist_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."decks"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "decks" ADD CONSTRAINT "decks_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "decks_rels" ADD CONSTRAINT "decks_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."decks"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "decks_rels" ADD CONSTRAINT "decks_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "card_collection_sets_cards" ADD CONSTRAINT "card_collection_sets_cards_card_id_cards_id_fk" FOREIGN KEY ("card_id") REFERENCES "public"."cards"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "card_collection_sets_cards" ADD CONSTRAINT "card_collection_sets_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."card_collection_sets"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "card_collection_sets" ADD CONSTRAINT "card_collection_sets_set_id_sets_id_fk" FOREIGN KEY ("set_id") REFERENCES "public"."sets"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "card_collection_sets" ADD CONSTRAINT "card_collection_sets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."card_collection"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "card_collection" ADD CONSTRAINT "card_collection_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_artists_fk" FOREIGN KEY ("artists_id") REFERENCES "public"."artists"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_cards_fk" FOREIGN KEY ("cards_id") REFERENCES "public"."cards"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_characters_fk" FOREIGN KEY ("characters_id") REFERENCES "public"."characters"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_keywords_fk" FOREIGN KEY ("keywords_id") REFERENCES "public"."keywords"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_sets_fk" FOREIGN KEY ("sets_id") REFERENCES "public"."sets"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_spoilers_fk" FOREIGN KEY ("spoilers_id") REFERENCES "public"."spoilers"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_decks_fk" FOREIGN KEY ("decks_id") REFERENCES "public"."decks"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_card_collection_fk" FOREIGN KEY ("card_collection_id") REFERENCES "public"."card_collection"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "articles_author_idx" ON "articles" USING btree ("author_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "articles_slug_idx" ON "articles" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "articles_cover_image_idx" ON "articles" USING btree ("cover_image_id");
  CREATE INDEX IF NOT EXISTS "articles_updated_at_idx" ON "articles" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "articles_created_at_idx" ON "articles" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "articles__status_idx" ON "articles" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "articles_rels_order_idx" ON "articles_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "articles_rels_parent_idx" ON "articles_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "articles_rels_path_idx" ON "articles_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "articles_rels_categories_id_idx" ON "articles_rels" USING btree ("categories_id");
  CREATE INDEX IF NOT EXISTS "_articles_v_parent_idx" ON "_articles_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_articles_v_version_version_author_idx" ON "_articles_v" USING btree ("version_author_id");
  CREATE INDEX IF NOT EXISTS "_articles_v_version_version_slug_idx" ON "_articles_v" USING btree ("version_slug");
  CREATE INDEX IF NOT EXISTS "_articles_v_version_version_cover_image_idx" ON "_articles_v" USING btree ("version_cover_image_id");
  CREATE INDEX IF NOT EXISTS "_articles_v_version_version_updated_at_idx" ON "_articles_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_articles_v_version_version_created_at_idx" ON "_articles_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_articles_v_version_version__status_idx" ON "_articles_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_articles_v_created_at_idx" ON "_articles_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_articles_v_updated_at_idx" ON "_articles_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_articles_v_latest_idx" ON "_articles_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_articles_v_autosave_idx" ON "_articles_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "_articles_v_rels_order_idx" ON "_articles_v_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "_articles_v_rels_parent_idx" ON "_articles_v_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_articles_v_rels_path_idx" ON "_articles_v_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "_articles_v_rels_categories_id_idx" ON "_articles_v_rels" USING btree ("categories_id");
  CREATE INDEX IF NOT EXISTS "artists_updated_at_idx" ON "artists" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "artists_created_at_idx" ON "artists" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "cards_recycle_order_idx" ON "cards_recycle" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "cards_recycle_parent_id_idx" ON "cards_recycle" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "cards_rune_order_idx" ON "cards_rune" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "cards_rune_parent_idx" ON "cards_rune" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "cards_character_idx" ON "cards" USING btree ("character_id");
  CREATE INDEX IF NOT EXISTS "cards_set_idx" ON "cards" USING btree ("set_id");
  CREATE INDEX IF NOT EXISTS "cards_artist_idx" ON "cards" USING btree ("artist_id");
  CREATE INDEX IF NOT EXISTS "cards_card_art_idx" ON "cards" USING btree ("card_art_id");
  CREATE INDEX IF NOT EXISTS "cards_updated_at_idx" ON "cards" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "cards_created_at_idx" ON "cards" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "cards_rels_order_idx" ON "cards_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "cards_rels_parent_idx" ON "cards_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "cards_rels_path_idx" ON "cards_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "cards_rels_keywords_id_idx" ON "cards_rels" USING btree ("keywords_id");
  CREATE INDEX IF NOT EXISTS "cards_rels_tags_id_idx" ON "cards_rels" USING btree ("tags_id");
  CREATE INDEX IF NOT EXISTS "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "characters_updated_at_idx" ON "characters" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "characters_created_at_idx" ON "characters" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "keywords_updated_at_idx" ON "keywords" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "keywords_created_at_idx" ON "keywords" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "sets_key_art_idx" ON "sets" USING btree ("key_art_id");
  CREATE INDEX IF NOT EXISTS "sets_updated_at_idx" ON "sets" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "sets_created_at_idx" ON "sets" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "spoilers_rune_order_idx" ON "spoilers_rune" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "spoilers_rune_parent_idx" ON "spoilers_rune" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "spoilers_recycle_order_idx" ON "spoilers_recycle" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "spoilers_recycle_parent_id_idx" ON "spoilers_recycle" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "spoilers_character_idx" ON "spoilers" USING btree ("character_id");
  CREATE INDEX IF NOT EXISTS "spoilers_card_idx" ON "spoilers" USING btree ("card_id");
  CREATE INDEX IF NOT EXISTS "spoilers_set_idx" ON "spoilers" USING btree ("set_id");
  CREATE INDEX IF NOT EXISTS "spoilers_artist_idx" ON "spoilers" USING btree ("artist_id");
  CREATE INDEX IF NOT EXISTS "spoilers_card_art_idx" ON "spoilers" USING btree ("card_art_id");
  CREATE INDEX IF NOT EXISTS "spoilers_updated_at_idx" ON "spoilers" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "spoilers_created_at_idx" ON "spoilers" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "spoilers_rels_order_idx" ON "spoilers_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "spoilers_rels_parent_idx" ON "spoilers_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "spoilers_rels_path_idx" ON "spoilers_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "spoilers_rels_keywords_id_idx" ON "spoilers_rels" USING btree ("keywords_id");
  CREATE INDEX IF NOT EXISTS "spoilers_rels_tags_id_idx" ON "spoilers_rels" USING btree ("tags_id");
  CREATE INDEX IF NOT EXISTS "tags_updated_at_idx" ON "tags" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "tags_created_at_idx" ON "tags" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "users_links_order_idx" ON "users_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "users_links_parent_id_idx" ON "users_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "decks_highlights_order_idx" ON "decks_highlights" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "decks_highlights_parent_id_idx" ON "decks_highlights" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "decks_highlights_highlight_idx" ON "decks_highlights" USING btree ("highlight_id");
  CREATE INDEX IF NOT EXISTS "decks_cardlist_order_idx" ON "decks_cardlist" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "decks_cardlist_parent_id_idx" ON "decks_cardlist" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "decks_cardlist_card_idx" ON "decks_cardlist" USING btree ("card_id");
  CREATE INDEX IF NOT EXISTS "decks_author_idx" ON "decks" USING btree ("author_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "decks_slug_idx" ON "decks" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "decks_updated_at_idx" ON "decks" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "decks_created_at_idx" ON "decks" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "decks_rels_order_idx" ON "decks_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "decks_rels_parent_idx" ON "decks_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "decks_rels_path_idx" ON "decks_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "decks_rels_tags_id_idx" ON "decks_rels" USING btree ("tags_id");
  CREATE INDEX IF NOT EXISTS "card_collection_sets_cards_order_idx" ON "card_collection_sets_cards" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "card_collection_sets_cards_parent_id_idx" ON "card_collection_sets_cards" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "card_collection_sets_cards_card_idx" ON "card_collection_sets_cards" USING btree ("card_id");
  CREATE INDEX IF NOT EXISTS "card_collection_sets_order_idx" ON "card_collection_sets" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "card_collection_sets_parent_id_idx" ON "card_collection_sets" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "card_collection_sets_set_idx" ON "card_collection_sets" USING btree ("set_id");
  CREATE INDEX IF NOT EXISTS "card_collection_owner_idx" ON "card_collection" USING btree ("owner_id");
  CREATE INDEX IF NOT EXISTS "card_collection_updated_at_idx" ON "card_collection" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "card_collection_created_at_idx" ON "card_collection" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_articles_id_idx" ON "payload_locked_documents_rels" USING btree ("articles_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_artists_id_idx" ON "payload_locked_documents_rels" USING btree ("artists_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_cards_id_idx" ON "payload_locked_documents_rels" USING btree ("cards_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_characters_id_idx" ON "payload_locked_documents_rels" USING btree ("characters_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_keywords_id_idx" ON "payload_locked_documents_rels" USING btree ("keywords_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_sets_id_idx" ON "payload_locked_documents_rels" USING btree ("sets_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_spoilers_id_idx" ON "payload_locked_documents_rels" USING btree ("spoilers_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_tags_id_idx" ON "payload_locked_documents_rels" USING btree ("tags_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_decks_id_idx" ON "payload_locked_documents_rels" USING btree ("decks_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_card_collection_id_idx" ON "payload_locked_documents_rels" USING btree ("card_collection_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX IF NOT EXISTS "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "articles" CASCADE;
  DROP TABLE "articles_rels" CASCADE;
  DROP TABLE "_articles_v" CASCADE;
  DROP TABLE "_articles_v_rels" CASCADE;
  DROP TABLE "artists" CASCADE;
  DROP TABLE "cards_recycle" CASCADE;
  DROP TABLE "cards_rune" CASCADE;
  DROP TABLE "cards" CASCADE;
  DROP TABLE "cards_rels" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "characters" CASCADE;
  DROP TABLE "keywords" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "sets" CASCADE;
  DROP TABLE "spoilers_rune" CASCADE;
  DROP TABLE "spoilers_recycle" CASCADE;
  DROP TABLE "spoilers" CASCADE;
  DROP TABLE "spoilers_rels" CASCADE;
  DROP TABLE "tags" CASCADE;
  DROP TABLE "users_links" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "decks_highlights" CASCADE;
  DROP TABLE "decks_cardlist" CASCADE;
  DROP TABLE "decks" CASCADE;
  DROP TABLE "decks_rels" CASCADE;
  DROP TABLE "card_collection_sets_cards" CASCADE;
  DROP TABLE "card_collection_sets" CASCADE;
  DROP TABLE "card_collection" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TYPE "public"."enum_articles_status";
  DROP TYPE "public"."enum__articles_v_version_status";
  DROP TYPE "public"."enum_cards_recycle_rune";
  DROP TYPE "public"."enum_cards_rune";
  DROP TYPE "public"."enum_cards_type";
  DROP TYPE "public"."enum_cards_rarity";
  DROP TYPE "public"."enum_keywords_type";
  DROP TYPE "public"."enum_keywords_position";
  DROP TYPE "public"."enum_keywords_color";
  DROP TYPE "public"."enum_spoilers_rune";
  DROP TYPE "public"."enum_spoilers_recycle_rune";
  DROP TYPE "public"."enum_spoilers_type";
  DROP TYPE "public"."enum_spoilers_rarity";
  DROP TYPE "public"."enum_users_links_site";
  DROP TYPE "public"."enum_users_role";`);
}
