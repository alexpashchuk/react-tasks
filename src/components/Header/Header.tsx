import classes from './header.module.css';

const Header = () => {
  let a = 'test';
  return (
    <header className={classes.header}>
      <div className="container">
        <div className={classes.nav}>
          <a className={classes.link} href="/characters">
            <h1>The Rick and Morty</h1>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
