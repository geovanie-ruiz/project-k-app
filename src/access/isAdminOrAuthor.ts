import { Access } from 'payload';

export const isAdminOrAuthor: Access = ({ req: { user } }) => {
  // Need to be logged in
  if (user) {
    // If user has role of 'admin'
    if (user.role === 'admin') {
      return true;
    }

    // If any other type of user, only provide access to themselves
    return {
      author: {
        equals: user.id,
      },
    };
  }

  // Reject everyone else
  return false;
};
