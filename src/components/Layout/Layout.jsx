import React from 'react';
import Navigation from '../Navigation/Navigation';
import styles from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={styles.layoutContainer}>
      <div className={styles.navContainer}>
        <Navigation />
      </div>
      {children}
    </div>
  );
};

export default Layout;
