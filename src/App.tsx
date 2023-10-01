import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import CharacterDetail from '~components/CharacterDetail/CharacterDetail.tsx';
import CharactersRoot from '~components/CharactersRoot/CharactersRoot.tsx';
import NotFoundPage from '~components/NotFound/NotFoundPage.tsx';
import { MainLayout } from '~components/MainLayout/MainLayout.tsx';

const App = () => {
    return (
        <BrowserRouter>
            <MainLayout>
                <Routes>
                    <Route path="/" element={<Navigate replace to="characters" />} />
                    <Route path="characters" element={<CharactersRoot />}>
                        <Route path=":id" element={<CharacterDetail />} />
                    </Route>
                    <Route path="404" element={<NotFoundPage />} />
                    <Route path="*" element={<Navigate to="404" />} />
                </Routes>
            </MainLayout>
        </BrowserRouter>
    );
};

export default App;
