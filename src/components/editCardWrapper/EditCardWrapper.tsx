import React, { useState } from 'react';
import Popup from '../popup/Popup';
import ConfirmationPopup from '../confirmationPopup/ConfirmationPopup';
import './EditCardWrapper.css';

type CardUpdateValues = {
  text: string;
  translatedText: string;
  backgroundColor?: string | null;
  textColor?: string | null;
  translatedTextColor?: string | null;
};

type EditCardWrapperProps = {
  initialValues: CardUpdateValues;
  onClose: () => void;
  onSave: (values: CardUpdateValues) => void;
  onDelete: () => void;
};

const EditCardWrapper: React.FC<EditCardWrapperProps> = ({
                                                           initialValues,
                                                           onClose,
                                                           onSave,
                                                           onDelete,
                                                         }) => {
  const [values, setValues] = useState<CardUpdateValues>(initialValues);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(values);
    onClose();
  };

  const handleDelete = () => {
    setIsDeletePopupOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete();
    setIsDeletePopupOpen(false);
    onClose();
  };

  const handleCancelDelete = () => {
    setIsDeletePopupOpen(false);
  };

  return (
    <>
      <Popup onClose={onClose}>
        <div className="edit-card-wrapper">
          <div className="popup-header">
            <h2>Edit Card</h2>
          </div>

          <div className="popup-body">
            <div className="text-section">
              <div className="section-title">Original Text</div>
              <div className="form-field">
                <label>Text:</label>
                <textarea
                  name="text"
                  value={values.text}
                  onChange={handleChange}
                  rows={4}
                />
              </div>
              <div className="form-field">
                <label>Text Color:</label>
                <input
                  type="color"
                  name="textColor"
                  value={values.textColor || '#000000'}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="translated-text-section">
              <div className="section-title">Translated Text</div>
              <div className="form-field">
                <label>Translated Text:</label>
                <textarea
                  name="translatedText"
                  value={values.translatedText}
                  onChange={handleChange}
                  rows={4}
                />
              </div>
              <div className="form-field">
                <label>Translated Text Color:</label>
                <input
                  type="color"
                  name="translatedTextColor"
                  value={values.translatedTextColor || '#000000'}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="form-field">
            <label>Background Color:</label>
            <input
              type="color"
              name="backgroundColor"
              value={values.backgroundColor || '#ffffff'}
              onChange={handleChange}
            />
          </div>

          <div className="popup-footer">
            <button className="delete-button" onClick={handleDelete}>
              Delete Card
            </button>
            <button className="save-button" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </Popup>

      {isDeletePopupOpen && (
        <ConfirmationPopup
          message="Are you sure you want to delete this card?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </>
  );
};

export default EditCardWrapper;
