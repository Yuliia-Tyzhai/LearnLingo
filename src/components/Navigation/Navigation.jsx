import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { ReactSVG } from 'react-svg';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';

import styles from './Navigation.module.css';
import learnLingoLogo from '../../../public/ukraine.svg';
import loginIcon from '../../assets/login-icon.svg';

import { isTeachersPage } from '../../utils/isTeachersPage';
import Modal from '../Modal/Modal';
import LoginForm from '../LoginForm/LoginForm';
import RegistrationForm from '../RegistrationForm/RegistrationForm';

const Navigation = () => {
  const location = useLocation();
  const isTeachersPageCheck = isTeachersPage(location.pathname);
  const user = useSelector(selectUser);

  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegistrationModalOpen, setRegistrationModalOpen] = useState(false);

  const openLoginModal = () => setLoginModalOpen(true);
  const closeLoginModal = () => setLoginModalOpen(false);

  const openRegistrationModal = () => setRegistrationModalOpen(true);
  const closeRegistrationModal = () => setRegistrationModalOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <nav className={styles.navigationContainer}>
          <Link to="/" className={styles.learnLingoLogoContainer}>
            <ReactSVG className={styles.learnLingoLogo} src={learnLingoLogo} />
            <span className={styles.learnLingoText}>LearnLingo</span>
          </Link>
          <ul className={styles.navList}>
            <li className={styles.navListItem}>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  clsx(
                    styles.link,
                    isActive && !isTeachersPageCheck && styles.active
                  )
                }
                end
              >
                Home
              </NavLink>
            </li>
            <li className={styles.navListItem}>
              <NavLink
                to="/teachers"
                className={({ isActive }) =>
                  clsx(
                    styles.link,
                    isActive && !isTeachersPageCheck && styles.active
                  )
                }
                end
              >
                Teachers
              </NavLink>
            </li>
            {user && (
              <li className={styles.navListItem}>
                <NavLink
                  to="/favorites"
                  className={({ isActive }) =>
                    clsx(styles.link, isActive && styles.active)
                  }
                >
                  Favorites
                </NavLink>
              </li>
            )}
          </ul>
        </nav>

        <div className={styles.buttonsContainer}>
          {!user && (
            <>
              <button className={styles.loginBtn} onClick={openLoginModal}>
                <ReactSVG src={loginIcon} className={styles.loginIcon} />
                Log In
              </button>
              <button
                className={styles.registrationBtn}
                onClick={openRegistrationModal}
              >
                Registration
              </button>
            </>
          )}
        </div>
      </div>

      {isLoginModalOpen && (
        <Modal onClose={closeLoginModal}>
          <div className={styles.loginTitleContainer}>
            <h2 className={styles.loginTitle}>Log In</h2>
            <p className={styles.loginText}>
              Welcome back! Please enter your credentials to access your account
              and continue your search for a teacher.
            </p>
          </div>
          <LoginForm onClose={closeLoginModal} />
        </Modal>
      )}

      {isRegistrationModalOpen && (
        <Modal onClose={closeRegistrationModal}>
          <div className={styles.registerTitleContainer}>
            <h2 className={styles.registerTitle}>Registration</h2>
            <p className={styles.registerText}>
              Thank you for your interest in our platform! In order to register,
              we need some information. Please provide us with the following
              details.
            </p>
          </div>
          <RegistrationForm onClose={closeRegistrationModal} />
        </Modal>
      )}
    </header>
  );
};

export default Navigation;
