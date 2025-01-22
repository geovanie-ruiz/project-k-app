import { postgresAdapter } from '@payloadcms/db-postgres';
import path from 'path';
import { buildConfig } from 'payload';
import { fileURLToPath } from 'url';

import { Articles } from './collections/Articles';
import { Artists } from './collections/Artists';
import { CardCollection } from './collections/CardCollection';
import { Cards } from './collections/Cards';
import { Categories } from './collections/Categories';
import { Characters } from './collections/Characters';
import { Decks } from './collections/Decks';
import { Keywords } from './collections/Keywords';
import { Media } from './collections/Media';
import { Sets } from './collections/Sets';
import { Spoilers } from './collections/Spoilers';
import { Tags } from './collections/Tags';
import { Users } from './collections/Users';
import { ArticlesTableExpansion } from './schemaHooks/articles';
import { CardsTableExpansion } from './schemaHooks/cards';
import { DecksTableExpansion } from './schemaHooks/decks';
import { cloudinaryStorage } from './utils/cloudinary';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      breakpoints: [
        {
          name: 'mobile',
          height: 667,
          label: 'Mobile',
          width: 375,
        },
      ],
    },
    avatar: {
      Component: '@/components/custom/clerkAvatar',
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
  collections: [
    Articles,
    Artists,
    Cards,
    Categories,
    Characters,
    Keywords,
    Media,
    Sets,
    Spoilers,
    Tags,
    Users,
    Decks,
    CardCollection,
  ],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    afterSchemaInit: [
      CardsTableExpansion,
      ArticlesTableExpansion,
      DecksTableExpansion,
    ],
  }),
  plugins: [
    cloudinaryStorage({
      enabled: true,
      collections: {
        ['media']: true,
      },
      config: {
        cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '',
        api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || '',
        api_secret: process.env.CLOUDINARY_API_SECRET || '',
      },
    }),
  ],
});
