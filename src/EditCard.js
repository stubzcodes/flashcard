import { Link, useParams, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { readDeck, readCard, updateCard } from "../src/utils/api";
import CardForm from "./CardForm";

function EditCard() {
  const history = useHistory();
  const { deckId, cardId } = useParams();
  const [deck, setDeck] = useState({ cards: [] });
  const [card, setCard] = useState({
    front: "",
    back: "",
    deckId: Number(deckId),
    id: Number(cardId),
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {//loads deck using readDeck and sets that information as setDeck
    async function loadDeck() {
      try {
        const loadedDeck = await readDeck(deckId);
        setDeck(loadedDeck);
      } catch (error) {
        console.error("Error loading deck:", error);
      }
    }

    async function loadCard() {
      try {
        const loadedCard = await readCard(cardId); //loads card using readDeck and sets that information as loadedCard
        setCard(loadedCard);
        setIsLoading(false);//trouble shooting toggle to make sure information is loading properly
      } catch (error) {
        console.error("Error loading card:", error);
      }
    }
    //calls loadDeck and loadCard with deckId and cardId as dependencies
    loadDeck();
    loadCard();
  }, [deckId, cardId]);

  function submitHandler(updatedCard) { //submit handler updates card and sends user back to deck page
    updateCard(updatedCard).then(() => {
      history.push(`/decks/${deckId}`);
    });
  }

  function cancel() {
    history.push(`/decks/${deckId}`); //cancel sends user back to deck page without changing card information
  }

  if (isLoading) { //trouble shooting ternary
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  }
  return ( //if information is loaded, loads jsx
    <main>
      <nav className="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <span className="oi oi-home" /> Home
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>Deck {deck.name}</Link>
          </li>
          <li className="breadcrumb-item active">Edit Card {card.id}</li>
        </ol>
      </nav>
      <h1>Edit Card</h1>

      <CardForm
        onSubmit={submitHandler}
        onCancel={cancel}
        submitLabel={"Submit"}
        cancelLabel={"Cancel"}
        initialState={card}
      />
    </main>
  );
}

export default EditCard;
