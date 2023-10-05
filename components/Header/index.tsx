'use client';

import React from 'react';
import Image from 'next/image';
import Avatar from 'react-avatar';
import { MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/24/solid';

import { useSearchTodo } from '@/hooks/useSearchTodo';
import * as styles from './index.styles';

export function Header() {
  const { searchString, handleSearchStringChange } = useSearchTodo();

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
          <UserCircleIcon className={styles.suggestionIconStyles} />
          SUGGESTIONS FOR YOU
        </p>
      </div>
    </header>
  );
}
