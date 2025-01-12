import { Card } from "@/payload-types"

export type RuneType = 'Calm' | 'Chaos' | 'Fury' | 'Mental' | 'Order' | 'Physical'
export type CardType = 'Legend' | 'Battlefield' | 'Champion' | 'Unit' | 'Spell' | 'Gear' | 'Rune'

export interface DeckListCard {
  card: Card
  quantity: number
}

export interface TCGCardFilter {
  searchValue: string
  searchMode: 'name' | 'text' | 'both'
  runes: RuneType[]
  type: CardType[]
}

export interface EditDeckList {
  legend: DeckListCard[]
  battlefields: DeckListCard[]
  mainDeck: DeckListCard[]
  runeDeck: DeckListCard[]
  deckName: string
  deckVisibility: 'public' | 'private'
}