import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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
};
