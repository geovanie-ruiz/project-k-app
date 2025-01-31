import Link from 'next/link';
import { JSX } from 'react';

import {
  SiBluesky,
  SiDiscord,
  SiTiktok,
  SiTwitch,
  SiYoutube,
} from '@icons-pack/react-simple-icons';
import { Notebook, Podcast } from 'lucide-react';
import MobalyticLogo from '../icons/MobalyticLogo';
import OpGG from '../icons/OPGGLogo';
import TCGPlayerIcon from '../icons/TCGPlayerIcon';

export enum SupportedSocials {
  Blog = 'Blog',
  Bluesky = 'Bluesky',
  Discord = 'Discord',
  Mobalytics = 'Mobalytics',
  OPGG = 'OP.GG',
  Podcast = 'Podcast',
  TCGplayer = 'TCGplayer',
  TikTok = 'TikTok',
  Twitch = 'Twitch',
  YouTube = 'YouTube',
}

export const SOCIALS: SupportedSocials[] = [
  SupportedSocials.Blog,
  SupportedSocials.Bluesky,
  SupportedSocials.Discord,
  SupportedSocials.Mobalytics,
  SupportedSocials.OPGG,
  SupportedSocials.Podcast,
  SupportedSocials.TCGplayer,
  SupportedSocials.TikTok,
  SupportedSocials.Twitch,
  SupportedSocials.YouTube,
];

type SocialLink = {
  id?: string | null;
  url: string;
  site: SupportedSocials;
};

const isUrl = (url: string) => {
  return URL.canParse(url);
};

const isDiscord = (url: string) => {
  const parsedURL = new URL(url);
  const hostname = parsedURL.hostname;
  return hostname.toLowerCase().includes('discord.gg');
};

const isMobalytics = (url: string) => {
  const parsedURL = new URL(url);
  const hostname = parsedURL.hostname;
  return hostname.toLowerCase().includes('mobalytics.gg');
};

const isOpGG = (url: string) => {
  const parsedURL = new URL(url);
  const hostname = parsedURL.hostname;
  return hostname.toLowerCase().includes('op.gg');
};

const isTcgPlayer = (url: string) => {
  const parsedURL = new URL(url);
  const hostname = parsedURL.hostname;
  return hostname.toLowerCase().includes('tcgplayer.com');
};

const isTikTok = (url: string) => {
  const parsedURL = new URL(url);
  const hostname = parsedURL.hostname;
  return hostname.toLowerCase().includes('tiktok.com');
};

const isTwitch = (url: string) => {
  const parsedURL = new URL(url);
  const hostname = parsedURL.hostname;
  return hostname.toLowerCase().includes('twitch.tv');
};

const isBluesky = (url: string) => {
  const parsedURL = new URL(url);
  const hostname = parsedURL.hostname;
  return hostname.toLowerCase().includes('bsky.app');
};

const isYoutube = (url: string) => {
  const parsedURL = new URL(url);
  const hostname = parsedURL.hostname;
  return hostname.toLowerCase().includes('youtube.com');
};

export default function SocialLink({ url, site }: SocialLink) {
  if (!url || !site) return;
  if (!isUrl(url)) return;

  let icon: JSX.Element = <></>;

  switch (site) {
    case SupportedSocials.Bluesky:
      if (!isBluesky(url)) return;
      icon = <SiBluesky />;
      break;
    case SupportedSocials.Blog:
      icon = <Notebook />;
      break;
    case 'Discord':
      if (!isDiscord(url)) return;
      icon = <SiDiscord />;
      break;
    case 'Mobalytics':
      if (!isMobalytics(url)) return;
      icon = <MobalyticLogo />;
      break;
    case 'OP.GG':
      if (!isOpGG(url)) return;
      icon = <OpGG />;
      break;
    case 'Podcast':
      icon = <Podcast />;
      break;
    case 'TCGplayer':
      if (!isTcgPlayer(url)) return;
      icon = <TCGPlayerIcon />;
      break;
    case 'TikTok':
      if (!isTikTok(url)) return;
      icon = <SiTiktok />;
      break;
    case 'Twitch':
      if (!isTwitch(url)) return;
      icon = <SiTwitch />;
      break;
    case 'YouTube':
      if (!isYoutube(url)) return;
      icon = <SiYoutube />;
      break;
  }

  return (
    <Link href={url} target="_blank">
      {icon}
    </Link>
  );
}
