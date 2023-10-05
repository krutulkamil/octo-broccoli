import React from 'react';

import { useBoardStore } from '@/store/BoardStore';

export const useSearchTodo = () => {
  const { searchString, setSearchString } = useBoardStore();

  function handleSearchStringChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchString(e.target.value);
  }

  return {
    searchString,
    handleSearchStringChange,
  };
};
