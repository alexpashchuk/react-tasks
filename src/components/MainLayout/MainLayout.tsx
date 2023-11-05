import Footer from '~components/Footer/Footer.tsx';
import Header from '~components/Header/Header.tsx';

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => (
  <>
    <Header />
    <main className={'container'}>{children}</main>
    <Footer />
  </>
);
