import classes from './header.module.css';

const Header = () => {
  return (
    <header className={classes.header}>
      <div className="container">
        <div className={classes.nav}>
          <a className={classes.link} href="/characters">
            <h1>Anime</h1>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
