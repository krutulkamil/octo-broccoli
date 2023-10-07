'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Avatar from 'react-avatar';
import { MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/24/solid';

import { useBoardStore } from '@/store/BoardStore';
import { useSearchTodo } from '@/hooks/useSearchTodo';
import { fetchSuggestion } from '@/lib/fetchSuggestion';
import { cn } from '@/utils/cn';
import * as styles from './index.styles';

export function Header() {
  const { searchString, handleSearchStringChange } = useSearchTodo();
  const { board } = useBoardStore();

  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestions] = useState('');

  useEffect(() => {
    if (!board.columns.size) return;
    setLoading(true);

    async function fetchSuggestionFunc() {
      const suggestion = await fetchSuggestion(board);
      setSuggestions(suggestion);
      setLoading(false);
    }

    fetchSuggestionFunc();
  }, [board]);

  return (
    <header>
      <div className={styles.headerGridWrapperStyles}>
        <div className={styles.gradientWrapperStyles} />

        <Image
          src="/dashboard.png"
          alt="logo"
          width={300}
          height={100}
          className={styles.logoStyles}
          draggable={false}
        />

        <div className={styles.searchFormWrapperStyles}>
          <form className={styles.searchFormStyles}>
            <MagnifyingGlassIcon className={styles.searchIconStyles} />
            <input
              type="text"
              placeholder="Search"
              value={searchString}
              onChange={handleSearchStringChange}
              className={styles.searchInputStyles}
            />
            <button type="submit" hidden>
              Search
            </button>
          </form>

          <Avatar name="Kamil Krutul" size="50" color="#0055D1" round />
        </div>
      </div>

      <div className={styles.suggestionWrapperStyles}>
        <p className={styles.suggestionTextStyles}>
          <UserCircleIcon
            className={cn(
              styles.suggestionIconStyles,
              loading && styles.isLoadingSuggestionsStyles
            )}
          />
          {suggestion && !loading ? suggestion : 'GPT is thinking...'}
        </p>
      </div>
    </header>
  );
}
