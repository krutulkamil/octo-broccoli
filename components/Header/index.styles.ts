import { cn } from '@/utils/cn';

export const logoStyles = cn(`w-44 md:w-56 pb-10 md:pb-0 object-contain`);

export const headerGridWrapperStyles = cn(
  `flex flex-col md:flex-row items-center p-5 bg-gray-500/10 rounded-b-2xl`
);

export const gradientWrapperStyles = cn(
  `absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-pink-400 to-[#0055D1] rounded-md filter blur-3xl opacity-50 -z-50`
);

export const searchFormWrapperStyles = cn(
  `flex items-center space-x-5 flex-1 justify-end w-full`
);

export const searchFormStyles = cn(
  `flex items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial`
);

export const searchInputStyles = cn(`flex-1 outline-none p-2`);

export const searchIconStyles = cn(`h-6 w-6 text-gray-400 ml-2`);

export const suggestionWrapperStyles = cn(
  `flex items-center justify-center px-5 py-2 md:py-5`
);

export const suggestionTextStyles = cn(
  `flex items-center text-sm font-light p-5 shadow-xl rounded-xl w-fit bg-white tracking-wide max-w-3xl text-[#0055D1]`
);

export const suggestionIconStyles = cn(
  `inline-block h-10 w-10 text-[#0055D1] mr-1`
);
