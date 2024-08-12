import { ReactNode, useEffect, useState } from 'react';

interface NoSsrProps {
  children: ReactNode;
}

export default function NoSsr({ children }: NoSsrProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return children;
}
