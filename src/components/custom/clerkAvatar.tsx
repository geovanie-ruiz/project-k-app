'use client';

import { isDarkTheme } from '@/utils/utils';
import { UserButton } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { useTheme } from 'next-themes';

const ClerkAvatar: React.FC = () => {
  const { theme, systemTheme } = useTheme();

  return (
    <UserButton
      appearance={{
        baseTheme: isDarkTheme(theme, systemTheme) ? dark : undefined,
      }}
      userProfileMode="navigation"
      userProfileUrl="/profile"
    />
  );
};

export default ClerkAvatar;
