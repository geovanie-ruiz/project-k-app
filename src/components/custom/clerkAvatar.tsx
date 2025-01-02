'use client';

import { isDarkTheme } from '@/utils/utils';
import { UserButton } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { useTheme } from 'next-themes';
import ProfileIcon from '../icons/CreatorProfile';

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
          labelIcon={<ProfileIcon className={'size-4'} />}
          href="/admin/account"
        />
        <UserButton.Action label="manageAccount" />
        <UserButton.Action label="signOut" />
      </UserButton.MenuItems>
    </UserButton>
  );
};

export default ClerkAvatar;
