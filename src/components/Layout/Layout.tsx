import { Component } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header.tsx';
import Footer from '../Footer/Footer.tsx';

export default class Layout extends Component {
    render() {
        return (
            <>
                <Header />
                <main className={'container'}>
                    <Outlet />
                </main>
                <Footer />
            </>
        );
    }
}
