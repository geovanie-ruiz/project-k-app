'use client';

import { isDarkTheme } from '@/utils/utils';
import { UserButton } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { useTheme } from 'next-themes';

const DotIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="lucide lucide-user creator-profile"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
};

const ClerkAvatar: React.FC = () => {
  const { theme, systemTheme } = useTheme();

  return (
    <UserButton
      appearance={{
        baseTheme: isDarkTheme(theme, systemTheme) ? dark : undefined,
      }}
      userProfileMode="navigation"
      userProfileUrl="/profile"
    >
      <UserButton.MenuItems>
        <UserButton.Link
          label="Creator Profile"
          labelIcon={<DotIcon />}
          href="/admin/account"
        />
        <UserButton.Action label="manageAccount" />
        <UserButton.Action label="signOut" />
      </UserButton.MenuItems>
    </UserButton>
  );
};

export default ClerkAvatar;
