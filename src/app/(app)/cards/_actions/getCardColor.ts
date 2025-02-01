type Runes =
  | ('Calm' | 'Chaos' | 'Fury' | 'Mental' | 'Order' | 'Physical')[]
  | null
  | undefined;

export const getCardColorBG = (rune: Runes) => {
  if (!rune || rune.length === 0) return 'bg-Gray';
  if (rune.length === 1) return `bg-${rune[0]}`;
  if (rune.length === 2)
    return `bg-gradient-to-r from-${rune[0]} to-${rune[1]}`;
};
