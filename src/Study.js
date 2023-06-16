import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { readDeck } from "../src/utils/api";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import StudyCard from "./StudyCard";
import StudyPage from "./StudyPage";

function Study() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({ cards: [] });
  const [cardNumber, setCardNumber] = useState(1);
  const history = useHistory();

  const cardCount = deck.cards.length;
  const card = deck.cards[cardNumber - 1];
  const heading = `Card ${cardNumber} of ${cardCount}`

  useEffect(() => {
    readDeck(deckId).then(setDeck);
  }, [deckId]);
  console.log(deck);

  if (cardCount <= 2) {
    return (
      <>
        <h2>Not Enough Cards</h2>
        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
          <span className="oi oi-plus" /> Add Cards
        </Link>
      </>
    );
  }

  function handleNext() {
    if (cardNumber === cardCount) {
      const goHome = !window.confirm(
        "Restart cards?\n\nClick 'cancel' to return to the home page."
      );
      return goHome ? history.push("/") : setCardNumber(1);
    }
    setCardNumber((prevState) => Math.min(cardCount, prevState + 1));
  }

  return (
    <StudyPage name={deck.name} deckId={deck.id}>
      <StudyCard card={card} heading={heading}>
        <button onClick={handleNext} type="button" className="btn btn-primary">Next</button>
      </StudyCard>
    </StudyPage>
  );
}

export default Study;