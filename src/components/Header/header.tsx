import { NavLink } from 'react-router-dom';

import classes from './header.module.css';

const Header = () => {
  return (
    <header className={classes.header}>
      <div className="container">
        <nav className={classes.nav}>
          <NavLink className={classes.link} to="." end>
            Main Page
          </NavLink>
          <NavLink className={classes.link} to="uncontrolled-form">
            Uncontrolled Form
          </NavLink>
          <NavLink className={classes.link} to="react-hook-form">
            React Hook Form
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
