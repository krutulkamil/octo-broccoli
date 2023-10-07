import { cn } from '@/utils/cn';

export const todoStyles = cn(`bg-red-500`);

export const inprogressStyles = cn(`bg-yellow-500`);

export const doneStyles = cn(`bg-green-500`);

export const mainWrapperStyles = cn(`w-full py-5`);

export const centerWrapperStyles = cn(`mx-auto w-full max-w-md`);

export const radioInnerWrapperStyles = cn(`space-y-2`);

export const radioIsActiveStyles = cn(
  `ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300`
);

export const radioIsCheckedStyles = cn(`bg-opacity-75 text-white`);

export const radioIsNotCheckedStyles = cn(`bg-white`);

export const radioOptionStyles = cn(
  `relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
);

export const optionFlexStyles = cn(`flex items-center justify-between flex-1`);

export const optionCenterStyles = cn(`flex items-center`);

export const optionTextSmStyles = cn(`text-sm`);

export const labelStyles = cn(`font-medium`);

export const labelCheckedStyles = cn(`text-white`);

export const labelNotCheckedStyles = cn(`text-gray-900`);

export const descriptionStyles = cn(`inline`);

export const descriptionCheckedStyles = cn(`text-white`);

export const descriptionNotCheckedStyles = cn(`text-gray-500`);

export const iconWrapperStyles = cn(`shrink-0 text-white`);

export const checkIconStyles = cn(`h-6 w-6`);
