import { useState } from 'react';
import GenerateCardsWrapper from '../../components/generateCardsWrapper/GenerateCardsWrapper.tsx';
import {
  useGetCardsQuery,
  useUpdateCardMutation,
  useDeleteCardMutation,
  useGenerateCardsMutation,
  GenerateCardsInput,
  GenerateCardsTranslationsInput,
  UpdateCardInput,
} from '../../gql/graphql.ts';
import Card from '../../components/card/Card.tsx';
import './Cards.css';
import axios from 'axios';

type CardUpdateValues = {
  text: string;
  translatedText: string;
  backgroundColor?: string | null;
  textColor?: string | null;
  translatedTextColor?: string | null;
};

const Cards = () => {
  const [isGenerateCardsPopupOpen, setIsGenerateCardsPopupOpen] = useState(false);
  const { loading, error, data, refetch } = useGetCardsQuery();
  const [updateCard] = useUpdateCardMutation();
  const [deleteCard] = useDeleteCardMutation();
  const [generateCards] = useGenerateCardsMutation();
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  if (loading) return <div className="centered-text">Loading...</div>;
  if (error) return <div className="centered-text">Error: {error.message}</div>;

  const handleGenerateBtnClick = () => {
    setIsGenerateCardsPopupOpen(true);
  };

  const handleUpdateCard = async (input: UpdateCardInput) => {
    try {
      await updateCard({ variables: { input } });
      console.log(`Card ${input.id} updated successfully`);
      refetch();
    } catch (err) {
      console.error(`Failed to update card ${input.id}:`, err);
    }
  };

  const handleDeleteCard = async (id: string) => {
    try {
      await deleteCard({ variables: { id } });
      console.log(`Card ${id} deleted successfully`);
      refetch();
    } catch (err) {
      console.error(`Failed to delete card ${id}:`, err);
    }
  };

  const handleGenerateCardsPopupClose = () => {
    setIsGenerateCardsPopupOpen(false);
  };

  const handleGenerateCards = async (values: GenerateCardsInput) => {
    try {
      const formattedTranslations: GenerateCardsTranslationsInput[] = values.translations.map((t) => ({
        text: t.text,
        translatedText: t.translatedText || '', // Ensure translatedText is a string
      }));

      const input: GenerateCardsInput = {
        backgroundColor: values.backgroundColor,
        textColor: values.textColor,
        translatedTextColor: values.translatedTextColor,
        spreadsheetUrl: values.spreadsheetUrl || null,
        sourceLanguage: values.sourceLanguage || null,
        targetLanguage: values.targetLanguage || null,
        translations: formattedTranslations,
      };

      await generateCards({ variables: { input } });
      console.log('Cards generated successfully');
      refetch();
    } catch (err) {
      console.error('Failed to generate cards:', err);
    }
  };

  const handleDownloadCards = async () => {
    setIsDownloading(true);
    setDownloadError(null);
    try {
      // Make a GET request to the REST endpoint
      const response = await axios.get('http://localhost:8080/api/cards/download', {
        responseType: 'blob', // Important for handling binary data
      });

      // Create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create a temporary link element
      const link = document.createElement('a');
      link.href = url;

      // Extract the filename from the Content-Disposition header if available
      const contentDisposition = response.headers['content-disposition'];
      let fileName = 'cards.zip';
      if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(/filename="?(.+)"?/);
        if (fileNameMatch && fileNameMatch[1]) {
          fileName = fileNameMatch[1];
        }
      }

      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();

      // Clean up and remove the link
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);

      console.log('Cards downloaded successfully');
    } catch (err: unknown) {
      console.error('Failed to download cards:', err);
      setDownloadError((err as { message: string })?.message || 'Failed to download cards');
    } finally {
      setIsDownloading(false);
    }
  };

  const cards = data?.getCards;

  return (
    <div className="cards-container">
      <div className="buttons-container">
        <button onClick={handleGenerateBtnClick} className="generate-cards-button">
          Generate Cards
        </button>
        <button
          onClick={handleDownloadCards}
          className="download-cards-button"
          disabled={isDownloading || !cards || cards.length === 0}
        >
          {isDownloading ? 'Downloading...' : 'Download Cards'}
        </button>
      </div>
      {downloadError && <div className="error-message">Error: {downloadError}</div>}
      {cards?.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          backgroundColor={card.backgroundColor || '#ffffff'}
          textColor={card.textColor || '#000000'}
          translatedTextColor={card.translatedTextColor || '#000000'}
          sourceText={card.translation?.text || ''}
          translatedText={card.translation?.translatedText || ''}
          onUpdate={async (updatedValues: CardUpdateValues) =>
            await handleUpdateCard({
              id: card.id,
              backgroundColor: updatedValues.backgroundColor,
              textColor: updatedValues.textColor,
              translatedTextColor: updatedValues.translatedTextColor,
              translation: {
                id: card.translation?.id || '',
                text: updatedValues.text,
                translatedText: updatedValues.translatedText,
              },
            })
          }
          onDelete={async () => await handleDeleteCard(card.id)}
        />
      ))}
      {isGenerateCardsPopupOpen && (
        <GenerateCardsWrapper onClose={handleGenerateCardsPopupClose} onGenerate={handleGenerateCards} />
      )}
    </div>
  );
};

export default Cards;
