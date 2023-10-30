import { Component } from 'react';

import classes from './errorPage.module.css';

export class ErrorPage extends Component {
  render() {
    return (
      <section className={classes.root}>
        <h1 className={classes.heading}>Error</h1>
        <p className={classes.text}>Something went wrong</p>
        <button className={classes.errorBtn} onClick={() => window.location.reload()}>
          Click to reload
        </button>
      </section>
    );
  }
}
