import { Component } from 'react';

import classes from './spinner.module.css';

export default class Spinner extends Component {
    render() {
        return <div className={classes.loader}></div>;
    }
}
