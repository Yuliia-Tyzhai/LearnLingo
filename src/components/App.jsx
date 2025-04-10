import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout/Layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PrivateRoute from '../components/PrivateRoute/PrivateRoute';

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
        <ToastContainer />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/teachers" element={<TeachersPage />} />
            <Route
              path="/favorites"
              element={
                <PrivateRoute>
                  <FavoritesPage />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Layout>
    </div>
  );
}

export default App;
