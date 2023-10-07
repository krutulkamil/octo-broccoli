import { cn } from '@/utils/cn';

export const modalFormStyles = cn(`relative z-10`);

export const backdropStyles = cn(`fixed inset-0 bg-black bg-opacity-25`);

export const overflowWrapperStyles = cn(`fixed inset-0 overflow-y-auto`);

export const transitionWrapperStyles = cn(
  `flex min-h-full items-center justify-center p-4 text-center`
);

export const dialogPanelStyles = cn(
  `w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all`
);

export const dialogTitleStyles = cn(
  `text-lg font-medium leading-6 text-gray-900 pb-2`
);

export const dialogInputMarginStyles = cn(`mt-2`);

export const dialogInputStyles = cn(
  `w-full border border-gray-300 rounded-md outline-none p-5`
);
