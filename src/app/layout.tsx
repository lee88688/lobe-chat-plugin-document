'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

import NoSsr from '@/components/ui/noSsr';

import './globals.css';

function Provider(props: PropsWithChildren) {
  const client = new QueryClient();
  return <QueryClientProvider client={client}>{props.children}</QueryClientProvider>;
}

export default function RootLayout(props: PropsWithChildren) {
  return (
    <html lang={'en'}>
      <body>
        <NoSsr>
          <Provider>{props.children}</Provider>
        </NoSsr>
      </body>
    </html>
  );
}
