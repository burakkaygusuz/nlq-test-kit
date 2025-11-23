'use client';

import { HeroUIProvider } from '@heroui/react';
import { ReactNode } from 'react';

export function Providers({ children }: Readonly<{ children: ReactNode }>) {
  return <HeroUIProvider>{children}</HeroUIProvider>;
}
