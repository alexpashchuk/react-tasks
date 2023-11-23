import { PropsWithChildren } from 'react';

import SearchBar from '@/components/SearchBar/searchBar';
import classes from './layout.module.css';

function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <main className={classes.main}>
        <div className={classes.result}>
          <SearchBar />
          {children}
        </div>
      </main>
    </>
  );
}

export default Layout;
