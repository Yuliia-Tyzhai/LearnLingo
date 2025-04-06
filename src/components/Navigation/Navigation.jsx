import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Navigation.module.css';
import { ReactSVG } from 'react-svg';
import learnLingoLogo from '../../../public/ukraine.svg';

import { isTeachersPage } from '../../utils/isTeachersPage';
import Modal from '../Modal/Modal';

const Navigation = () => {
  const location = useLocation();
  const isTeachersPageCheck = isTeachersPage(location.pathname);

  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegistrationModalOpen, setRegistrationModalOpen] = useState(false);

  const openLoginModal = () => setLoginModalOpen(true);
  const closeLoginModal = () => setLoginModalOpen(false);

  const openRegistrationModal = () => setRegistrationModalOpen(true);
  const closeRegistrationModal = () => setRegistrationModalOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.learnLingoLogoContainer}>
          <Link to="/">
            <ReactSVG className={styles.learnLingoLogo} src={learnLingoLogo} />
            <span className={styles.learnLingoText}>LearnLingo</span>
          </Link>
        </div>

        <div>
          <nav className={styles.nav}>
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
              <li className={styles.navListItem}>
                <button className={styles.loginBtn} onClick={openLoginModal}>
                  Log In
                </button>
              </li>
              <li className={styles.navListItem}>
                <button
                  className={styles.registrationBtn}
                  onClick={openRegistrationModal}
                >
                  Registration
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {isLoginModalOpen && (
        <Modal onClose={closeLoginModal}>
          <h2>Log In</h2>

          <form>
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <button type="submit">Log In</button>
          </form>
        </Modal>
      )}

      {isRegistrationModalOpen && (
        <Modal onClose={closeRegistrationModal}>
          <h2>Registration</h2>

          <form>
            <input type="text" placeholder="Username" required />
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <button type="submit">Register</button>
          </form>
        </Modal>
      )}
    </header>
  );
};

export default Navigation;
