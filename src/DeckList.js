import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listDecks, deleteDeck } from "../src/utils/api";

function DeckList() {
  const [decks, setDecks] = useState([]);

  useEffect(loadDecks, []);

  function handleDelete(deckId) {
    if (window.confirm("Are you sure you want to delete this deck?")) {
      try {
        deleteDeck(deckId).then(loadDecks);
      } catch (error) {
        console.error("Error deleting deck:", error);
      }
    }
  }

  function loadDecks() {
    try {
      listDecks().then(setDecks);
    } catch (error) {
      console.error("Error loading decks:", error);
    }
  }

  const listOfDeck = decks.map((deck) => (
    <li 
      key={deck.id}
      className="list-group-item list-group-item-action flex-column align-items-start"
    >
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">{deck.name}</h5>
        <small>{deck.cards.length} cards</small>
      </div>
      <p className="mb-1">{deck.description}</p>
      <Link
        to={`/decks/${deck.id}`}
        className="btn btn-secondary mr-2"
        title="View deck"
      >
        <span className="oi oi-eye" /> View
      </Link>
      <Link
        to={`/decks/${deck.id}/study`}
        className="btn btn-primary"
        title="Study deck"
      >
        <span className="oi oi-book" /> Study
      </Link>
      <button
        className="btn btn-danger float-right"
        title="Delete deck"
        onClick={() => handleDelete(deck.id)}
      >
        <span className="oi oi-trash" />
      </button>
    </li>
  ));

  return (
    <div className="">
      <Link to="decks/new" className="btn btn-secondary">
        <span className="oi oi-plus" /> Create Deck
      </Link>
      <ul className="list-group mt-2 deck-list">{listOfDeck}</ul>
    </div>
  );
}

export default DeckList;