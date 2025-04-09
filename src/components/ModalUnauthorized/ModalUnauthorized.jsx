import React from 'react';

const ModalUnauthorized = ({ onClose }) => {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content">
        <h2>You should log in</h2>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ModalUnauthorized;
