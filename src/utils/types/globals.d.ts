export {};

// Create a type for the roles
export type Roles = 'user' | 'creator' | 'admin' | 'patron' | '';

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
}
