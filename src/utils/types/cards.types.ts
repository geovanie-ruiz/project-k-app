export type TCGCard = {
  set: string;
  id: string;
  imageUrl: string;
  name: string;
  text: string;
  type: string;
  supertype: string;
  subtype: string[];
  runes: string[];
  might: number;
  cost: number;
  recycling: number;
}