import type { ReactElement } from 'react';
import type { NextRouter } from 'next/router';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { vi } from 'vitest';

export const createMockRouter = (router: Partial<NextRouter> = {}) => {
  const mockRouter: NextRouter = {
    basePath: '',
    pathname: '/',
    route: '/',
    asPath: '/',
    query: {},
    push: vi.fn(),
    replace: vi.fn(),
    reload: vi.fn(),
    back: vi.fn(),
    prefetch: vi.fn(),
    beforePopState: vi.fn(),
    events: {
      on: vi.fn(),
      off: vi.fn(),
      emit: vi.fn(),
    },
    isFallback: false,
    isLocaleDomain: false,
    isReady: true,
    isPreview: false,
    forward: vi.fn(),
  };
  return { ...mockRouter, ...router };
};

export const createRouterProvider = (router: Partial<NextRouter> = {}) => {
  return ({ children }: { children: ReactElement }) => (
    <RouterContext.Provider value={createMockRouter(router)}>{children}</RouterContext.Provider>
  );
};
