'use server';

import { headers as nextHeaders } from 'next/headers';
import { BasePayload } from 'payload';

export const getUser = async (payload: BasePayload): Promise<number | null> => {
  const headers = await nextHeaders();
  const { user } = await payload.auth({ headers });
  if (user) {
    return user.id;
  }
  return null;
};
