import { auth } from '@clerk/nextjs/server';

import { createAnonClient } from './anonClient';
import { createClerkSupabaseClientSsr } from './authenticatedClient';
import { createSupabaseServiceClient } from './createSupabaseServiceClient';

interface ClientProps {
  serviceConnection?: boolean;
}

export async function selectClient({ serviceConnection = false }: ClientProps) {
  if (serviceConnection) {
    return createSupabaseServiceClient();
  }

  const { userId } = await auth();

  if (userId) {
    return createClerkSupabaseClientSsr();
  } else {
    return createAnonClient();
  }
}
