'use client';

import { useUser } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import { CircleCheck, CirclePlus } from 'lucide-react';
import { useState } from 'react';

export default function AddButton({
  cardId,
  checked,
  onToggle,
  onAnon,
}: {
  cardId: number;
  checked: boolean;
  onToggle: (id: number, isToggled: boolean) => void;
  onAnon: () => void;
}) {
  const [isChecked, setIsChecked] = useState(checked);
  const { isSignedIn } = useUser();

  const iconVariants = {
    plus: { rotate: 0 },
    check: { rotate: 360 },
  };

  const backgroundVariants = {
    unchecked: { backgroundColor: 'hsl(var(--background))' },
    checked: { backgroundColor: 'hsl(var(--positive))' },
  };

  const handleClick = () => {
    if (isSignedIn) {
      if (!isChecked) {
        setIsChecked(true);
        onToggle(cardId, !isChecked);
      }
    } else {
      onAnon();
    }
  };

  return (
    <div key={`update-collection-w-${cardId}`}>
      <motion.button
        onClick={handleClick}
        className="absolute -bottom-4 right-4 flex size-8 items-center justify-center rounded-full shadow-lg"
        animate={isChecked ? 'checked' : 'unchecked'}
        variants={backgroundVariants}
        transition={{ duration: 0.3 }}
        aria-label={isChecked ? 'Uncheck' : 'Check'}
      >
        <motion.div
          initial={isChecked ? 'check' : 'plus'}
          animate={isChecked ? 'check' : 'plus'}
          variants={iconVariants}
          transition={{ duration: 0.3 }}
        >
          {isChecked ? (
            <CircleCheck className="size-8" />
          ) : (
            <CirclePlus className="size-8" />
          )}
        </motion.div>
      </motion.button>
    </div>
  );
}
