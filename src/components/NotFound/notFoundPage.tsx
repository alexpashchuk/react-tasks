import classes from './notFoundPage.module.css';
import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <section className={classes.root}>
      <h1 className={classes.heading}>404</h1>
      <p className={classes.text}>Page Not Found</p>
      <Link className={classes.backHome} href="/">
        Back Home
      </Link>
    </section>
  );
};

export default NotFoundPage;
