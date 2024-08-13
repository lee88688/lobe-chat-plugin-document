'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren, useEffect, useMemo, useState } from 'react';

import { createDatabase } from '@/database';

import './globals.css';

function Provider(props: PropsWithChildren) {
  const [isMounted, setIsMounted] = useState(false);

  const client = useMemo(() => {
    return new QueryClient();
  }, []);

  useEffect(() => {
    createDatabase();
    setIsMounted(true);
  }, []);

  return (
    <QueryClientProvider client={client}>{isMounted ? props.children : null}</QueryClientProvider>
  );
}

export default function RootLayout(props: PropsWithChildren) {
  return (
    <html lang={'en'}>
      <body>
        <Provider>{props.children}</Provider>
      </body>
    </html>
  );
}
