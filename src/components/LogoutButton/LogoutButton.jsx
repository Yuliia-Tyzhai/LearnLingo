import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../redux/auth/slice';
import styles from './LogotButton.module.css';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    dispatch(logoutUser()).then(() => {
      navigate('/');
    });
  };

  return (
    <button className={styles.logoutBtn} onClick={handleLogoutClick}>
      Log out
    </button>
  );
};

export default LogoutButton;
