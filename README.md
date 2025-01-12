# 2Runes.gg

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, install the dependencies:

```bash
npm i
# or
yarn install
# or
pnpm i
# or
bun install
```

For the local database, you'll want to ensure docker is installed. I prefer docker desktop:

- MacOS `brew install --cask Docker`
- Windows [Docker Desktop Installer](https://docs.docker.com/desktop/setup/install/windows-install/)

Once Docker of your preferred flavor is installed, run `docker compose up` to build the postgres container. The database will not require an authenticated user.

Add the database URI to your .env file: DATABASE_URI=postgresql://postgres@localhost:5432/two_runes

Your .env should also include variables for Payload, Clerk, Sentry, and Cloudinary or running the app will not work.

To ensure everything installed and things are good to go, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### HMR/Turbo

It's recommended to use turbo mode when developing locally:

```bash
npm run dev:turbo
# or
yarn dev:turbo
# or
pnpm dev:turbo
# or
bun dev:turbo
```

_Note: Sentry does not fully support turbo mode so remove the flag when you want sentry to capture issues._

## Payload CMS

When ran locally, Payload will automatically update the database schema. Changes made to the schema will be pushed to the local database. Migrations must be created when you're ready to commit to ensure the preview and production databases are correctly updated.

### Migrations

### Make migrations

`npm run payload migrate:create`

### Migrate

`npm run payload migrate`

### Check migration status

`npm run payload migrate:status`

### Revert to fresh database

This will drop all entities from the local database and will re-run all the migrations.

`npm run payload migrate:fresh`

### Generate payload types

For typescript to recognize payload types, you may need to generate a types file:

`npm run payload:types`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

To learn more about Payload CMS, take a look at the following resources:

- [Payload CMS Documentation](https://payloadcms.com/docs/getting-started/what-is-payload)
- [Examples](https://github.com/payloadcms/payload/tree/main/examples)

## Clerk

Authentication is provided by Clerk. Without a Clerk account you will not be able to access the Payload CMS admin panel, nor any content that requires authentication. Locally you will be connected to the development instance of Clerk. Once you create an account, reach out to Geo to have your account elevated to admin.

## Supabase

Preview and production databases are hosted on supabase. If you need to access those environments, reach out to Geo to be added to the team. However, seats are limited.

## Vercel

The site is hosted on Vercel. This shouldn't really be an issue until you're ready to deploy. Currently there is only 1 extra seat on the team we'll need to hand around to whomever is pushing a lot of commits. Otherwise all PRs should be created by Geo so that automated deployment can kick off.

## Cloudinary

Images are currently being hosted via Cloudinary. The `cloudinary-nextjs` library makes integrating with the CDN easy and performant. Instead of using Next.js <Image /> components, we'll be using <CldImage /> instead. Same benefits but the former is integrated with Vercel image delivery, and the latter with Cloudinary. So it's a great replacement.

Eventually static and uploaded files will be hosted locally when running in development. But for now, be mindful that media resources are being pulled down from Cloudinary.

## Sentry

Sentry is the tool we're using for observability. Eventually we'll get some integration with a proper issue tracker like JIRA but for now the interface provides plenty of insight for the level of issues we're seeing in production. That is to say, we've had one issue and it's been resolved.

Access is limited so work with Geo to be added to the team.

## Design

### Tailwind/Shadcn

To learn more about this CSS framework and the component library we're using, please read through the following:

- [Tailwind CSS](https://tailwindcss.com/docs/utility-first) Core Concepts
- [shadcn/ui](https://ui.shadcn.com/docs/components/accordion) Component library

### Figma

Figma is currently being managed by Metal. Get with him to be added to the figma file.
