import { Event } from '@/payload-types';
import { Access } from 'payload';

export const isAdminAuthorOrApproved: Access<Event> = ({ req: { user } }) => {
  // Need to be logged in
  if (user) {
    // If user has role of 'admin'
    if (user.role === 'admin') {
      return true;
    }

    // If any other type of user, only provide access to themselves
    return {
      or: [
        {
          author: {
            equals: user.id,
          },
        },
      ],
    };
  }

  return {
    or: [
      {
        approved: {
          equals: true,
        },
      },
    ],
  };
};
