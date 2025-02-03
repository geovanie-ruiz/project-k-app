type Color =
  | 'Any'
  | 'Calm'
  | 'Chaos'
  | 'Fury'
  | 'Mental'
  | 'Order'
  | 'Physical';

type CardType =
  | 'Battlefield'
  | 'Champion'
  | 'Gear'
  | 'Legend'
  | 'Rune'
  | 'Spell'
  | 'Unit';

export function getRuneEmoji(color: Color) {
  if (color === 'Any') return '<:anyrune:1318855069869015131>';
  if (color === 'Calm') return '<:calm:1318806072647090247>';
  if (color === 'Chaos') return '<:chaos:1318806127584084038>';
  if (color === 'Fury') return '<:fury:1318806153550889030>';
  if (color === 'Mental') return '<:mental:1318806178158870581>';
  if (color === 'Order') return '<:order:1318806203182350437>';
  if (color === 'Physical') return '<:physical:1318806225512828939>';
}

export function getCardTypeEmoji(type: CardType) {
  if (type === 'Battlefield') return '<:battlefield:1318843660271616072>';
  if (type === 'Champion') return '<:champion:1318843684631875615>';
  if (type === 'Gear') return '<:gear:1318843695432208424>';
  if (type === 'Legend') return '<:legend:1318843709206302722>';
  if (type === 'Rune') return '<:rune:1335745787971375124>';
  if (type === 'Spell') return '<:spell:1318843730282811392>';
  if (type === 'Unit') return '<:unit:1318843757973737523>';
}

export function getCostEmoji(cost: number) {
  const COST: string[] = [
    '<:cost0:1319064857445929010>',
    '<:cost1:1319064868036284457>',
    '<:cost2:1319064878417182802>',
    '<:cost3:1319064888261214208>',
    '<:cost4:1319064898881196082>',
    '<:cost5:1319064908725354548>',
    '<:cost6:1319064920809148529>',
    '<:cost7:1319064931584442441>',
    '<:cost8:1319064940522246242>',
    '<:cost9:1319064949376684102>',
    '<:cost10:1319064958868394014>',
    '<:cost11:1319064974177337374>',
  ];
  return COST[cost];
}

export function getSymbolEmoji(symbol: 'might' | 'exhaust') {
  if (symbol === 'might') return '<:might:1318853651883753483>';
  if (symbol === 'exhaust') return '<:exhaust:1318952632554885123>';
}
