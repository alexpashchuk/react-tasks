import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout.tsx';
import MainPage from './components/Main/MainPage.tsx';

import NotFoundPage from './components/NotFound/NotFoundPage.tsx';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<MainPage />} />
                    <Route path="404" element={<NotFoundPage />} />
                    <Route path="*" element={<Navigate to="404" />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
