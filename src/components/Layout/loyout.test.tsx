import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import Layout from './layout';
import { createRouterProvider } from '@/test/mockRouter';

describe('Layout tests', () => {
  it('renders Layout', () => {
    const RouterProvider = createRouterProvider();
    const wrapper = render(
      <RouterProvider>
        <Layout />
      </RouterProvider>
    );
    expect(wrapper).not.toBeNull();
  });
});
