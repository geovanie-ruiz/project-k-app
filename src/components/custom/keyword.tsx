interface Swatch {
  [key: string]: string;
}

type KeywordProps = {
  label: string;
  color: string;
};

export const colorSwatches: Swatch = {
  '#699667': 'bg-[#699667] text-white',
  '#835b86': 'bg-[#835b86] text-white',
  '#a74e56': 'bg-[#a74e56] text-white',
  '#566f94': 'bg-[#566f94] text-white',
  '#ab972c': 'bg-[#ab972c] text-white',
  '#ba7152': 'bg-[#ba7152] text-white',
};

export default function Keyword({ label, color }: KeywordProps) {
  return (
    <div className={`border rounded-[4px] px-2 py-1 ${colorSwatches[color]}`}>
      {label}
    </div>
  );
}
