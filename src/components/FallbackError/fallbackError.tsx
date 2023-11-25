import classes from './fallbackError.module.css';
import Link from 'next/link';

const FallbackError = () => {
  return (
    <section className={classes.root}>
      <h1 className={classes.heading}>Error</h1>
      <p className={classes.text}>Something went wrong</p>
      <Link className={classes.errorBtn} href="/">
        Back Home
      </Link>
    </section>
  );
};

export default FallbackError;
