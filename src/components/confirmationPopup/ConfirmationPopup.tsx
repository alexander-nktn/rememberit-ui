import React from 'react';
import Popup from '../popup/Popup';
import './ConfirmationPopup.css';

type ConfirmationPopupProps = {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmationPopup: React.FC<ConfirmationPopupProps> = ({
                                                               message,
                                                               onConfirm,
                                                               onCancel,
                                                             }) => {
  return (
    <Popup onClose={onCancel}>
      <div className="confirmation-popup">
        <p>{message}</p>
        <div className="confirmation-buttons">
          <button className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
          <button className="confirm-button" onClick={onConfirm}>
            OK
          </button>
        </div>
      </div>
    </Popup>
  );
};

export default ConfirmationPopup;
