import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout/Layout';

const HomePage = React.lazy(() => import('../pages/HomePage/HomePage'));
const TeachersPage = React.lazy(() =>
  import('../pages/TeachersPage/TeachersPage')
);
const FavoritesPage = React.lazy(() =>
  import('../pages/FavoritesPage/FavoritesPage')
);
const NotFoundPage = React.lazy(() =>
  import('../pages/NotFoundPage/NotFoundPage')
);

const Loader = () => <div>Loading...</div>;

function App() {
  return (
    <div>
      <Layout>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/teachers" element={<TeachersPage />} />
            <Route path="/teachers/favorites" element={<FavoritesPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Layout>
    </div>
  );
}

export default App;
