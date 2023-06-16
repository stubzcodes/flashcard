import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, createCard } from "../src/utils/api";
import CardForm from "./CardForm";

function AddCard() {
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState({ cards: [] });

  useEffect(() => {
    readDeck(deckId).then(setDeck);
  }, [deckId]);

  function submitHandler(card) {
    createCard(deckId, card);
  }

  function doneHandler() {
    history.push(`/decks/${deckId}`);
  }

  return (
    <>
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
          <li className="breadcrumb-item active">Add Card</li>
        </ol>
      </nav>
      <CardForm
        deckName={deck.name}
        initialState={deck}
        onDone={doneHandler}
        onSubmit={submitHandler}
      />
    </>
  );
}

export default AddCard;
