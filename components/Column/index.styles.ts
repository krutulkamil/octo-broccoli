import { cn } from '@/utils/cn';

export const cardStyles = cn(`p-2 rounded-2xl shadow-sm`);

export const cardTitleStyles = cn(`flex justify-between font-bold text-xl p-2`);

export const cardTitleLengthStyles = cn(
  `text-gray-500 bg-gray-200 rounded-full px-2 py-1 text-sm font-normal`
);

export const isDraggingStyles = cn(`bg-green-200`);

export const isNotDraggingStyles = cn(`bg-white/50`);
