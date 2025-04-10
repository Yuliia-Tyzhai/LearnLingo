import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectUser } from '../../redux/auth/selectors';

const PrivateRoute = ({ children }) => {
  const user = useSelector(selectUser);

  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
