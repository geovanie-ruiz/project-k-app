import { clerkClient } from '@clerk/nextjs/server';
import type { FieldHook } from 'payload';
import type { User } from '../../payload-types';

export const updateRole: FieldHook<{ id: string } & User> = async ({
  data,
}) => {
  const client = await clerkClient();
  if (data?.clerk_id) {
    await client.users.updateUserMetadata(data?.clerk_id, {
      publicMetadata: {
        role: data?.role,
      },
    });
  }
};
