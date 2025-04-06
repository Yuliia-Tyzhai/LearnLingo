import React, { useEffect } from 'react';
import { ReactSVG } from 'react-svg';
import styles from './Modal.module.css';
import closeBtn from '../../assets/close-btn.svg';

const Modal = ({ children, onClose }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent}>
        <div
          className={styles.closeBtn}
          onClick={onClose}
          role="button"
          tabIndex={0}
        >
          <ReactSVG src={closeBtn} className={styles.closeIcon} />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
