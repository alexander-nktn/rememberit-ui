import { useState } from 'react';
import GenerateCardsWrapper from '../components/generateCardsWrapper/GenerateCardsWrapper';
import {
  useGetCardsQuery,
  useUpdateCardMutation,
  useDeleteCardMutation,
  useGenerateCardsMutation,
  GenerateCardsInput,
  GenerateCardsTranslationsInput,
  UpdateCardInput,
} from '../gql/graphql';
import Card from '../components/card/Card';
import './Cards.css';

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

  const cards = data?.getCards;

  return (
    <div className="cards-container">
      <button onClick={handleGenerateBtnClick} className="generate-cards-button">
        Generate Cards
      </button>
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
