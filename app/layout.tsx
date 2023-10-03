import React from 'react';
import type { Metadata } from 'next';

import * as styles from './layout.styles';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dashboard App',
  description: 'Generated by create next app',
};

interface IProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: IProps) {
  return (
    <html lang="en">
      <body className={styles.bodyWrapperStyles}>{children}</body>
    </html>
  );
}
