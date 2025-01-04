import { isAdmin } from '@/access/isAdmin';
import { isCollaborator } from '@/access/isCollaborator';
import { kebabIt } from '@/utils/utils';
import type { CollectionConfig } from 'payload';

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: isCollaborator,
    read: () => true,
    update: isCollaborator,
    delete: isAdmin,
  },
  admin: {
    group: 'Content',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    disableLocalStorage: true,
  },
  hooks: {
    beforeOperation: [
      ({ req, operation }) => {
        if ((operation === 'create' || operation === 'update') && req.file) {
          // Remove file extension from name
          // it's not handled well when sent to cloudinary leading to '.ext.ext'
          const { name } = req.file;
          const ext = name.lastIndexOf('.');
          let newName = name;
          if (ext > 0) {
            newName = name.slice(0, ext);
          }
          req.file.name = kebabIt({ toSkewer: newName, isFilename: true });
        }
      },
    ],
  },
};
