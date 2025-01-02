export {};

import { Roles } from './roles.types';

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role: Roles;
    };
  }
}
