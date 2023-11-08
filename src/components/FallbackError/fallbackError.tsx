import { Link } from 'react-router-dom';

import classes from './fallbackError.module.css';

const FallbackError = () => {
  return (
    <section className={classes.root}>
      <h1 className={classes.heading}>Error</h1>
      <p className={classes.text}>Something went wrong</p>
      <Link className={classes.errorBtn} to="/">
        Back Home
      </Link>
    </section>
  );
};

export default FallbackError;
