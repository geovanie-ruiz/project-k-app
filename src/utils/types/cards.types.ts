export enum CardType {
  UNIT = 'Unit',
  CHAMPION = 'Champion',
  LEGEND = 'Legend',
  SPELL = 'Spell',
  BATTLEFIELD = 'Battlefield',
  GEAR = 'Gear',
  RUNE = 'Rune',
}

export enum RuneType {
  ANY = 'Any',
  CALM = 'Calm',
  CHAOS = 'Chaos',
  FURY = 'Fury',
  MENTAL = 'Mental',
  ORDER = 'Order',
  PHYSICAL = 'Physical',
}

export enum Rarity {
  NONE = 'None',
  COMMON = 'Common',
  UNCOMMON = 'Uncommon',
  RARE = 'Rare',
  LEGENDARY = 'Legendary',
  PROMO = 'Promo',
}

export const COMBAT_TYPES = ['Unit', 'Champion'];
export const RULES_TYPES = ['Rune', 'Battlefield', 'Legend'];
export const CHARACTER_TYPES = ['Legend', 'Spell'];
export const SIMPLE_TYPES = ['Rune', 'Battlefield'];
