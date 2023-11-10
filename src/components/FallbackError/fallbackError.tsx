import classes from './fallbackError.module.css';

const FallbackError = () => {
  return (
    <section className={classes.root}>
      <h1 className={classes.heading}>Error</h1>
      <p className={classes.text}>Something went wrong</p>
      <a className={classes.errorBtn} href="/">
        Back Home
      </a>
    </section>
  );
};

export default FallbackError;
