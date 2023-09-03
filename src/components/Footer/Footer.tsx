import { Component } from 'react';
import clsx from 'clsx';

import LogoRss from '../../assets/images/rss.svg';
import LogoGitHub from '../../assets/images/github.svg';

import classes from './footer.module.css';

export default class Footer extends Component {
    render() {
        return (
            <footer className={classes.footer}>
                <div className={clsx('container', classes.footerWrapper)}>
                    <a href="https://rs.school/react/" target="_blank" rel="noreferrer" className={classes.link}>
                        <LogoRss className={classes.logoRss} />
                    </a>
                    <a href="https://github.com/alexpashchuk" target="_blank" rel="noreferrer" className={classes.link}>
                        <LogoGitHub className={classes.logoGitHub} />
                    </a>
                </div>
            </footer>
        );
    }
}
