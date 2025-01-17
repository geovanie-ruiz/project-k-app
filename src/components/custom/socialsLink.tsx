import Link from 'next/link';
import { JSX } from 'react';

import {
  SiDiscord,
  SiInstagram,
  SiTiktok,
  SiTwitch,
  SiX,
  SiYoutube,
} from '@icons-pack/react-simple-icons';
import { Notebook, Podcast } from 'lucide-react';
import MobalyticLogo from '../icons/MobalyticLogo';
import OpGG from '../icons/OPGGLogo';
import TCGPlayerIcon from '../icons/TCGPlayerIcon';

type SocialLink = {
  id?: string | null;
  url: string;
  site:
    | 'Blog'
    | 'Discord'
    | 'Instagram'
    | 'Mobalytics'
    | 'OP.GG'
    | 'Podcast'
    | 'TCGplayer'
    | 'TikTok'
    | 'Twitch'
    | 'Twitter (X)'
    | 'YouTube';
};

const isUrl = (url: string) => {
  return URL.canParse(url);
};

const isDiscord = (url: string) => {
  const parsedURL = new URL(url);
  const hostname = parsedURL.hostname;
  return hostname.toLowerCase().includes('discord.gg');
};

const isInstagram = (url: string) => {
  const parsedURL = new URL(url);
  const hostname = parsedURL.hostname;
  return hostname.toLowerCase().includes('instagram.com');
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

const isTwitter = (url: string) => {
  const parsedURL = new URL(url);
  const hostname = parsedURL.hostname;
  return hostname.toLowerCase().includes('x.com');
};

const isYoutube = (url: string) => {
  const parsedURL = new URL(url);
  const hostname = parsedURL.hostname;
  return hostname.toLowerCase().includes('youtube.com');
};

export default function SocialLink({ id, url, site }: SocialLink) {
  if (!url || !site) return;
  if (!isUrl(url)) return;

  let icon: JSX.Element = <></>;

  switch (site) {
    case 'Blog':
      icon = <Notebook />;
      break;
    case 'Discord':
      if (!isDiscord(url)) return;
      icon = <SiDiscord />;
      break;
    case 'Instagram':
      if (!isInstagram(url)) return;
      icon = <SiInstagram />;
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
    case 'Twitter (X)':
      if (!isTwitter(url)) return;
      icon = <SiX />;
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
