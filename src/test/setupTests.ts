import { beforeAll, afterEach, afterAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import { server } from '~test/msw/server.ts';

expect.extend(matchers);

beforeAll(() => server.listen());

afterEach(() => {
  cleanup();
  server.resetHandlers();
});

afterAll(() => server.close());
