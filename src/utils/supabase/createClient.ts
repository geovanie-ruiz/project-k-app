import { auth } from '@clerk/nextjs/server';

import { createAnonClient } from "./anonClient";
import { createClerkSupabaseClientSsr } from "./authenticatedClient";

export async function createClient() {
  const { userId } = await auth()

  if (userId) {
    return createClerkSupabaseClientSsr()
  } else {
    return createAnonClient();
  }
}
