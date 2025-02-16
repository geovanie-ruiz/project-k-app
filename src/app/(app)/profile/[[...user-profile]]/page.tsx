'use client';

import { isDarkTheme } from '@/utils';
import { UserProfile } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { useTheme } from 'next-themes';

export default function Profile() {
  const { theme, systemTheme } = useTheme();

  return (
    <div className="flex justify-center">
      <UserProfile
        path="/profile"
        routing="path"
        appearance={{
          baseTheme: isDarkTheme(theme, systemTheme) ? dark : undefined,
        }}
      />
    </div>
  );
}
