import { Component } from 'react';
import classes from './buttonError.module.css';

export default class ButtonError extends Component {
    state = { hasError: false };
    render() {
        if (this.state.hasError) {
            throw Error('Something went wrong');
        }
        return (
            <button onClick={() => this.setState({ hasError: true })} className={classes.buttonError}>
                Error
            </button>
        );
    }
}
