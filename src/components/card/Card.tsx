import React, { useState } from 'react';
import './Card.css';
import Popup from '../popup/Popup';

type CardUpdateValues = {
  text: string;
  translatedText: string;
  backgroundColor?: string | null;
  textColor?: string | null;
  translatedTextColor?: string | null;
};

type CardProps = {
  id: string;
  backgroundColor?: string | null;
  textColor?: string | null;
  translatedTextColor?: string | null;
  sourceText: string;
  translatedText: string;
  onUpdate: (updatedValues: CardUpdateValues) => void;
  onDelete: () => void;
};

const Card: React.FC<CardProps> = ({
                                     // id,
                                     backgroundColor,
                                     textColor,
                                     translatedTextColor,
                                     sourceText,
                                     translatedText,
                                     onUpdate,
                                     onDelete,
                                   }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleCardClick = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handleSave = (updatedValues: CardUpdateValues) => {
    onUpdate(updatedValues);
  };

  const handleDelete = () => {
    onDelete();
    setIsPopupOpen(false);
  };

  return (
    <>
      <div
        className="card"
        style={{
          backgroundColor: backgroundColor || '',
          color: textColor || '',
        }}
        onClick={handleCardClick}
      >
        <div className="source-text">{sourceText}</div>
        <div
          className="translated-text"
          style={{
            color: translatedTextColor || '',
          }}
        >
          {translatedText}
        </div>
      </div>
      {isPopupOpen && (
        <Popup
          initialValues={{
            text: sourceText,
            translatedText,
            backgroundColor,
            textColor,
            translatedTextColor,
          }}
          onClose={handlePopupClose}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}
    </>
  );
};

export default Card;
