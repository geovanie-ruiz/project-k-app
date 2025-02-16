// 'use client';

// import { Card } from '@/components/ui/card';
// import { CldImage } from 'next-cloudinary';
// import { TCGCardData } from '@/utils/cards';
// import { cn } from '@/utils/utils';

// interface TCGCardProps extends TCGCardData {
//   scale?: number;
//   onClick?: () => void;
//   className?: string;
// }

// export function TCGCard({
//   name,
//   imageUrl,
//   type,
//   runes,
//   scale = 1,
//   onClick,
//   className,
// }: TCGCardProps) {
//   // Standard card dimensions (you can adjust these)
//   const baseWidth = 240;
//   const baseHeight = 336; // Using standard TCG card ratio of 1:1.4

//   return (
//     <Card
//       className={cn(
//         'relative group cursor-pointer hover:ring-2 hover:ring-primary transition-all duration-200',
//         className
//       )}
//       style={{
//         width: baseWidth * scale,
//         height: baseHeight * scale,
//       }}
//       onClick={onClick}
//     >
//       {imageUrl ? (
//         <CldImage
//           src={imageUrl}
//           alt={name}
//           fill
//           className="object-contain rounded-md"
//           sizes={`(max-width: 768px) ${baseWidth * scale}px, ${baseWidth * scale}px`}
//         />
//       ) : (
//         <div className="flex items-center justify-center w-full h-full bg-muted">
//           <span className="text-muted-foreground">{name}</span>
//         </div>
//       )}

//       {/* Rune indicators */}
//       <div className="absolute top-2 left-2 flex gap-1">
//         {runes.map((rune) => (
//           <div
//             key={rune}
//             className={cn('w-3 h-3 rounded-full', {
//               'bg-blue-500': rune === 'Calm',
//               'bg-red-500': rune === 'Chaos',
//               'bg-yellow-500': rune === 'Fury',
//               'bg-purple-500': rune === 'Mental',
//               'bg-green-500': rune === 'Order',
//               'bg-gray-500': rune === 'Physical',
//             })}
//             title={rune}
//           />
//         ))}
//       </div>

//       {/* Card type badge */}
//       <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs">
//         {type}
//       </div>
//     </Card>
//   );
// }
