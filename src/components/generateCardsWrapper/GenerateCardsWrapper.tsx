import React from 'react';
import Popup from '../popup/Popup';
import './GenerateCardsWrapper.css';

// type CardsGenerateValues = {
//   texts: string[];
//   backgroundColor?: string | null;
//   textColor?: string | null;
//   translatedTextColor?: string | null;
//   spreadsheetUrl?: string | null;
//   sourceLanguage?: string | null;
//   targetLanguage?: string | null;
// };

type EditCardWrapperProps = {
  onClose: () => void;
};

const GenerateCardsWrapper: React.FC<EditCardWrapperProps> = ({
                                                           onClose,
                                                         }) => {

  const handleGenerate = () => {
    onClose();
  };

  return (
    <>
      <Popup onClose={onClose}>
        <div className="generate-cards-wrapper">
          <div className="popup-header">
            <h2>Generate Cards</h2>
          </div>

          <div className="popup-body">
            some fields
          </div>

          <div className="popup-footer">
            <button className="generate-button" onClick={handleGenerate}>
              Generate
            </button>
          </div>
        </div>
      </Popup>
    </>
  );
};

export default GenerateCardsWrapper;
