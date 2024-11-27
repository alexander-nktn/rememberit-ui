import {
  useGetCardsQuery,
  useUpdateCardMutation,
  useDeleteCardMutation,
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
  const { loading, error, data, refetch } = useGetCardsQuery();
  const [updateCard] = useUpdateCardMutation();
  const [deleteCard] = useDeleteCardMutation();

  if (loading) return <div className="centered-text">Loading...</div>;
  if (error) return <div className="centered-text">Error: {error.message}</div>;

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

  return (
    <div className="cards-container">
      {data?.getCards.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          backgroundColor={card.backgroundColor}
          textColor={card.textColor}
          translatedTextColor={card.translatedTextColor}
          sourceText={card.translation?.text || ''}
          translatedText={card.translation?.translatedText || ''}
          onUpdate={(updatedValues: CardUpdateValues) =>
            handleUpdateCard({
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
          onDelete={() => handleDeleteCard(card.id)}
        />
      ))}
    </div>
  );
};

export default Cards;
