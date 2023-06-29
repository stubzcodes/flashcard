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
  const heading = `Card ${cardNumber} of ${cardCount}`;

  useEffect(() => {
    readDeck(deckId).then(setDeck); //loads deck infomation using deckId and sets current deck to that info
  }, [deckId]);

  if (cardCount <= 2) { //if card count is less than 2, returns not enough cards header and add cards button
    return (
      <div>
        <h2>Not Enough Cards</h2>
        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
          <span className="oi oi-plus" /> Add Cards
        </Link>
      </div>
    );
  }

  function handleNext() { //if on final card, gives user the option to restart or go to home
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
        <button onClick={handleNext} type="button" className="btn btn-primary">
          Next
        </button>
      </StudyCard>
    </StudyPage>
  );
}

export default Study;
