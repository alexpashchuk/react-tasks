import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './header.module.css';

export default class Header extends Component {
    render() {
        return (
            <header className={classes.header}>
                <div className="container">
                    <div className={classes.navWrapper}>
                        <h1>Header</h1>
                        <nav className={classes.nav}>
                            <NavLink className={classes.link} to="." end>
                                Home
                            </NavLink>
                            <NavLink className={classes.link} to="about">
                                About Us
                            </NavLink>
                        </nav>
                    </div>
                </div>
            </header>
        );
    }
}
