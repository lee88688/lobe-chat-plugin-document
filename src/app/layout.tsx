'use client';

import { PropsWithChildren } from 'react';

import NoSsr from '@/components/ui/noSsr';

import './globals.css';

export default function RootLayout(props: PropsWithChildren) {
  return (
    <html lang={'en'}>
      <body>
        <NoSsr>{props.children}</NoSsr>
      </body>
    </html>
  );
}
