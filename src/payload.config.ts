// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres';
import { payloadCloudPlugin } from '@payloadcms/payload-cloud';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { buildConfig } from 'payload';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

import { Media } from './collections/Media';
import { Users } from './collections/Users';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      url: ({ data, req }) => {
        if (process.env.NODE_ENV === 'development') {
          return 'http://localhost:300';
        }
        return `${req.protocol}//${req.host}/${data.slug}`;
      },
      collections: ['articles', 'cards', 'decks', 'spoilers', 'events'],
    },
    avatar: {
      Component: '@/components/custom/clerkAvatar',
    },
    routes: {
      account: '',
    },
    components: {
      providers: ['@/utils/clerk/context'],
      logout: {
        Button: {
          path: '@/components/custom/adminLogOut',
        },
      },
    },
  },
  collections: [Users, Media],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
});
