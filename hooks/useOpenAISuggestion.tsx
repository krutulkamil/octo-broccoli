import { useState, useEffect } from 'react';

import { useBoardStore } from '@/store/BoardStore';
import { fetchSuggestion } from '@/lib/fetchSuggestion';

export const useOpenAISuggestion = () => {
  const { board } = useBoardStore();

  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestions] = useState('');

  useEffect(() => {
    if (!board.columns.size) return;
    setIsLoading(true);

    async function fetchSuggestionFunc() {
      const suggestion = await fetchSuggestion(board);
      setSuggestions(suggestion);
      setIsLoading(false);
    }

    fetchSuggestionFunc();
  }, [board]);

  return {
    isSuggestionLoading: isLoading,
    suggestion,
  };
};
