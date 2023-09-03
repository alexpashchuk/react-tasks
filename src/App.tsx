import { Component } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout.tsx';
import HomePage from './components/Home/HomePage.tsx';
import AboutPage from './components/About/AboutPage.tsx';
import NotFoundPage from './components/NotFound/NotFoundPage.tsx';

export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<HomePage />} />
                        <Route path="about" element={<AboutPage />} />
                        <Route path="404" element={<NotFoundPage />} />
                        <Route path="*" element={<Navigate to="404" />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        );
    }
}
