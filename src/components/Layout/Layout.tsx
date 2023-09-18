import { Outlet } from 'react-router-dom';
import Header from '../Header/Header.tsx';
import Footer from '../Footer/Footer.tsx';

const Layout = () => {
    return (
        <>
            <Header />
            <main className={'container'}>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default Layout;
