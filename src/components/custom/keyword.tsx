interface Swatch {
  [key: string]: string;
}

type KeywordProps = {
  label: string;
  color: string;
};

export const colorSwatches: Swatch = {
  '#699667': 'bg-[#699667] text-white', // Calm Green
  '#835b86': 'bg-[#835b86] text-white', // Chaos Purple
  '#a74e56': 'bg-[#a74e56] text-white', // Fury Red
  '#566f94': 'bg-[#566f94] text-white', // Mental Blue
  '#ab972c': 'bg-[#ab972c] text-white', // Order Yellow
  '#ba7152': 'bg-[#ba7152] text-white', // Physical Orange
  '#536878': 'bg-[#536878] text-white', // Spell Timing Grey
  '#8F7236': 'bg-[#8F7236] text-white', // Phase Trigger Gold
};

export default function KeywordBadge({ label, color }: KeywordProps) {
  return (
    <div
      className={`inline-block align-middle text-sm border rounded-[4px] mr-1 px-2 ${colorSwatches[color]}`}
    >
      {label}
    </div>
  );
}
