import classes from './notFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <section className={classes.root}>
      <h1 className={classes.heading}>404</h1>
      <p className={classes.text}>Page Not Found</p>
      <a className={classes.backHome} href="/">
        Back Home
      </a>
    </section>
  );
};

export default NotFoundPage;
