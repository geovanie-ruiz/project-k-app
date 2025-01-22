import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

const stopWords = [
  'the',
  'a',
  'an',
  'and',
  'or',
  'but',
  'in',
  'on',
  'at',
  'of',
  'for',
  'to',
  'with',
];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isDarkTheme(
  theme: string | undefined,
  systemTheme: 'dark' | 'light' | undefined
) {
  if (theme === 'light') return false;
  return theme === 'dark' || systemTheme === 'dark';
}

export function showDateTitle(dateString: string, simple: boolean = false) {
  const date = new Date(dateString);

  if (simple) return date.toLocaleDateString();
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });
}

export function kebabIt({
  toSkewer,
  isFilename = false,
}: {
  toSkewer: string;
  isFilename?: boolean;
}) {
  let justTheMeat = toSkewer
    .replaceAll('-', ' ')
    .replaceAll("'", '')
    .replace(/([a-z])([A-Z])/g, '$1 $2') // give spacing for capital letters
    .replace(/[_]+/g, ' ')
    .replace(/[&\/\\#,+()$~%.":*!?<>{}]/g, ' '); // remove the symbols

  if (!isFilename) {
    justTheMeat = justTheMeat.replace(/[0-9]/g, ''); // remove numbers from article slugs
  }

  const words = justTheMeat
    .toLowerCase()
    .split(' ')
    .filter((word) => word !== '');

  if (words.length > 5 && !isFilename) {
    return words.filter((word) => !stopWords.includes(word)).join('-');
  } else {
    return words.join('-');
  }
}

export function formatDateTime(timestamp: string): string {
  const date = timestamp ? new Date(timestamp) : new Date();

  const months = date.getMonth();
  const days = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const MM = months + 1 < 10 ? `0${months + 1}` : months + 1;
  const DD = days < 10 ? `0${days}` : days;
  const YYYY = date.getFullYear();
  const HH = hours > 12 ? hours - 12 : hours;
  const MinMin = minutes < 10 ? `0${minutes}` : minutes;
  const AMPM = hours < 12 ? 'AM' : 'PM';

  return `${MM}/${DD}/${YYYY} ${HH}:${MinMin} ${AMPM}`;
}

export function formatSetId(
  setCode: string,
  setTotal: number,
  setIndex: number
): string {
  // assume index is padded to set digit length
  const indexLength = setTotal.toString().length;
  const paddedIndex = setIndex.toString().padStart(indexLength, '0');
  return `${setCode}-${paddedIndex}/${setTotal}`;
}
