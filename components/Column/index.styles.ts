import { cn } from '@/utils/cn';

export const columnStyles = cn(`p-2 rounded-2xl shadow-sm`);

export const columnTitleStyles = cn(
  `flex justify-between font-bold text-xl p-2`
);

export const columnTitleLengthStyles = cn(
  `text-gray-500 bg-gray-200 rounded-full px-2 py-1 text-sm font-normal`
);

export const columnContentWrapperStyles = cn(`space-y-2`);

export const isDraggingStyles = cn(`bg-green-200`);

export const isNotDraggingStyles = cn(`bg-white/50`);

export const addTodoWrapperStyles = cn(`flex items-end justify-end p-2`);

export const addTodoButtonStyles = cn(`text-green-500 hover:text-green-600`);

export const addTodoButtonIconStyles = cn(`h-10 w-10`);
