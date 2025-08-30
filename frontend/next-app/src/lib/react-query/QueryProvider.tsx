'use client'
import { QueryClientProvider } from '@tanstack/react-query';
import { useState, ReactNode } from 'react';
import { QueryClient } from '@tanstack/react-query';

export default function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}