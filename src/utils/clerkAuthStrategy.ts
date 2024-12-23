import { auth } from '@clerk/nextjs/server';
import { Payload } from 'payload';

type AuthStrategyFunctionArgs = {
  payload: Payload;
};

export default async function clerkAuthStrategy({
  payload,
}: AuthStrategyFunctionArgs) {
  const { userId } = await auth();

  if (!userId) {
    return {
      user: null,
    };
  }

  const usersQuery = await payload.find({
    collection: 'users',
    where: {
      clerk_id: {
        equals: userId,
      },
    },
  });

  return {
    user: usersQuery.docs[0] || null,
  };
}
