import React, { useState } from 'react';
import Popup from '../popup/Popup';
import { Language, GenerateCardsInput as GraphQLGenerateCardsInput } from '../../gql/graphql.ts';
import './GenerateCardsWrapper.css';

type GenerateCardsTranslationsInput = {
  text: string;
  translatedText: string;
};

type GenerateCardsWrapperProps = {
  onClose: () => void;
  onGenerate: (values: GraphQLGenerateCardsInput) => Promise<void>; // Use GraphQL-generated GenerateCardsInput
};

// Generate a list of language entries from the Language enum
const languageOptions: { code: Language; name: string }[] = Object.entries(Language).map(
  ([name, code]) => ({
    code: code as Language,
    name: name
      .split('_')
      .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
      .join(' '),
  })
);

const GenerateCardsWrapper: React.FC<GenerateCardsWrapperProps> = ({
                                                                     onClose,
                                                                     onGenerate,
                                                                   }) => {
  const [backgroundColor, setBackgroundColor] = useState<string>('#ffffff');
  const [textColor, setTextColor] = useState<string>('#000000');
  const [translatedTextColor, setTranslatedTextColor] = useState<string>('#000000');
  const [spreadsheetUrl, setSpreadsheetUrl] = useState<string>('');
  const [sourceLanguage, setSourceLanguage] = useState<Language | ''>('');
  const [targetLanguage, setTargetLanguage] = useState<Language | ''>('');
  const [translationsInput, setTranslationsInput] = useState<string>('');

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleTranslationsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTranslationsInput(e.target.value);
  };

  const validateInput = (): boolean => {
    if (!translationsInput.trim()) {
      setError('Please enter at least one word or expression.');
      return false;
    }
    if (!sourceLanguage) {
      setError('Please select a source language.');
      return false;
    }
    if (!targetLanguage) {
      setError('Please select a target language.');
      return false;
    }
    if (sourceLanguage === targetLanguage) {
      setError('Source and target languages must be different.');
      return false;
    }
    // Additional validations can be added here
    setError(null);
    return true;
  };

  const handleGenerate = async () => {
    if (!validateInput()) return;

    setLoading(true);
    try {
      const translationsArray: GenerateCardsTranslationsInput[] = translationsInput
        .split(',')
        .map((text) => text.trim())
        .filter((text) => text)
        .map((text) => ({ text, translatedText: '' })); // Assuming translations are empty initially

      const input: GraphQLGenerateCardsInput = {
        backgroundColor,
        textColor,
        translatedTextColor,
        spreadsheetUrl: spreadsheetUrl || null,
        sourceLanguage: sourceLanguage || null,
        targetLanguage: targetLanguage || null,
        translations: translationsArray,
      };

      await onGenerate(input);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2000);
    } catch (err) {
      console.error(err);
      setError('Failed to generate cards. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Popup onClose={onClose}>
      <div className="generate-cards-wrapper">
        <div className="popup-header">
          <h2>Generate Cards</h2>
        </div>

        <div className="popup-body">
          <div className="form-section">
            <div className="section-title">Enter Words or Expressions</div>
            <div className="form-field">
              <label htmlFor="translations">Words/Expressions (separated by commas):</label>
              <textarea
                id="translations"
                name="translations"
                value={translationsInput}
                onChange={handleTranslationsChange}
                rows={4}
                placeholder="e.g., Hello, World, React, GraphQL"
              />
              <small className="helper-text">
                Enter multiple words or expressions separated by commas.
              </small>
            </div>
          </div>

          {/* Integrated Color Pickers into "Additional Options" */}
          <div className="form-section">
            <div className="section-title">Additional Options</div>
            <div className="form-field">
              <label htmlFor="spreadsheetUrl">Spreadsheet URL:</label>
              <input
                type="url"
                id="spreadsheetUrl"
                name="spreadsheetUrl"
                value={spreadsheetUrl}
                onChange={(e) => setSpreadsheetUrl(e.target.value)}
                placeholder="https://example.com/spreadsheet"
              />
            </div>
            <div className="form-field">
              <label htmlFor="sourceLanguage">Source Language:</label>
              <select
                id="sourceLanguage"
                name="sourceLanguage"
                value={sourceLanguage}
                onChange={(e) => setSourceLanguage(e.target.value as Language)}
              >
                <option value="">Select Source Language</option>
                {languageOptions.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="targetLanguage">Target Language:</label>
              <select
                id="targetLanguage"
                name="targetLanguage"
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value as Language)}
              >
                <option value="">Select Target Language</option>
                {languageOptions.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Integrated Color Pickers without separate "Colors" title */}
            <div className="form-field">
              <label htmlFor="backgroundColor">Background Color:</label>
              <input
                type="color"
                id="backgroundColor"
                name="backgroundColor"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="textColor">Text Color:</label>
              <input
                type="color"
                id="textColor"
                name="textColor"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="translatedTextColor">Translated Text Color:</label>
              <input
                type="color"
                id="translatedTextColor"
                name="translatedTextColor"
                value={translatedTextColor}
                onChange={(e) => setTranslatedTextColor(e.target.value)}
              />
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">Cards generated successfully!</div>}
        </div>

        <div className="popup-footer">
          <button className="generate-button" onClick={handleGenerate} disabled={loading}>
            {loading ? 'Generating...' : 'Generate'}
          </button>
        </div>
      </div>
    </Popup>
  );
};

export default GenerateCardsWrapper;
