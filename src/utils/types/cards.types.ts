export enum CardType {
  UNIT = 'Unit',
  CHAMPION = 'Champion',
  LEGEND = 'Legend',
  SPELL = 'Spell',
  BATTLEFIELD = 'Battlefield',
  GEAR = 'Gear',
  RUNE = 'Rune',
}

export const CARD_TYPES: CardType[] = [
  CardType.UNIT,
  CardType.CHAMPION,
  CardType.LEGEND,
  CardType.SPELL,
  CardType.BATTLEFIELD,
  CardType.GEAR,
  CardType.RUNE,
];

export enum RuneType {
  ANY = 'Any',
  CALM = 'Calm',
  CHAOS = 'Chaos',
  FURY = 'Fury',
  MENTAL = 'Mental',
  ORDER = 'Order',
  PHYSICAL = 'Physical',
}

export const ALL_RUNE_TYPES: RuneType[] = [
  RuneType.ANY,
  RuneType.CALM,
  RuneType.CHAOS,
  RuneType.FURY,
  RuneType.MENTAL,
  RuneType.ORDER,
  RuneType.PHYSICAL,
];

export const RUNE_TYPES: RuneType[] = [
  RuneType.CALM,
  RuneType.CHAOS,
  RuneType.FURY,
  RuneType.MENTAL,
  RuneType.ORDER,
  RuneType.PHYSICAL,
];

export enum Rarity {
  NONE = 'None',
  WHITE_CIRCLE = 'White Circle',
  GREEN_TRIANGLE = 'Green Triangle',
  PURPLE_DIAMOND = 'Purple Diamond',
  GOLDEN_PENTAGON = 'Golden Pentagon',
  PROMO = 'Promo',
}

export const RARITIES: Rarity[] = [
  Rarity.NONE,
  Rarity.WHITE_CIRCLE,
  Rarity.GREEN_TRIANGLE,
  Rarity.PURPLE_DIAMOND,
  Rarity.GOLDEN_PENTAGON,
  Rarity.PROMO,
];

export const COMBAT_TYPES = ['Unit', 'Champion'];
export const RULES_TYPES = ['Rune', 'Battlefield', 'Legend'];
export const CHARACTER_TYPES = ['Legend', 'Spell'];
export const SIMPLE_TYPES = ['Rune', 'Battlefield'];
