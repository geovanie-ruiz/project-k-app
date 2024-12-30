import { Article } from '@/payload-types';
import { Access } from 'payload';

export const isAdminAuthorOrPublished: Access<Article> = ({
  req: { user },
}) => {
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
        _status: {
          equals: 'published',
        },
      },
    ],
  };
};
