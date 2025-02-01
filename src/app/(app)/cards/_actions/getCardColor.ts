type Runes =
  | ('Calm' | 'Chaos' | 'Fury' | 'Mental' | 'Order' | 'Physical')[]
  | null
  | undefined;

const NO_RUNE = 'bg-Gray';
const ONE_RUNE = {
  Calm: 'bg-Calm',
  Chaos: 'bg-Chaos',
  Fury: 'bg-Fury',
  Mental: 'bg-Mental',
  Order: 'bg-Order',
  Physical: 'bg-Physical',
};
const FROM = {
  Calm: 'from-Calm',
  Chaos: 'from-Chaos',
  Fury: 'from-Fury',
  Mental: 'from-Mental',
  Order: 'from-Order',
  Physical: 'from-Physical',
};
const TO = {
  Calm: 'to-Calm',
  Chaos: 'to-Chaos',
  Fury: 'to-Fury',
  Mental: 'to-Mental',
  Order: 'to-Order',
  Physical: 'to-Physical',
};

export const getCardColorBG = (rune: Runes) => {
  if (!rune || rune.length === 0) return NO_RUNE;
  if (rune.length === 1) return `${ONE_RUNE[rune[0]]}`;
  if (rune.length === 2)
    return `bg-gradient-to-r ${FROM[rune[0]]} ${TO[rune[1]]}`;
};
