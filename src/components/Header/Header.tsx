import { Component } from 'react';
// import { NavLink } from 'react-router-dom';
import classes from './header.module.css';
import { Link } from 'react-router-dom';

export default class Header extends Component {
    render() {
        return (
            <header className={classes.header}>
                <div className="container">
                    <div className={classes.nav}>
                        <Link className={classes.link} to="characters">
                            <h1>The Rick and Morty</h1>
                        </Link>
                    </div>
                </div>
            </header>
        );
    }
}
