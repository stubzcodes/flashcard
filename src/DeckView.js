import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../src/utils/api";
import CardList from "./CardList";

function DeckView() {
  const history = useHistory(); //sets history variable to useHistory function
  const { deckId } = useParams(); //allows code to find deckId using useParams

  const [deck, setDeck] = useState({ cards: [] }); 

  useEffect(loadDeck, [deckId]);

  function loadDeck() {//loads deck using readDeck function from utils, then sets that data as setDeck/deck
    try {
      readDeck(deckId).then(setDeck);
    } catch (error) {
      console.error("Error loading decks:", error);
    }
  }

  function handleDelete() {
    if (window.confirm("Are you sure you want to delete this deck?")) {
      try {
        deleteDeck(deck.id).then(() => history.push("/")); //deletes deck using deleteDeck function and deck.id, then send user back to home
      } catch (error) {
        console.error("Error deleting deck:", error);
      }
    }
  }

  function deleteCardHandler(cardId) {
    if (window.confirm("Are you sure you want to delete this card?")) {
      try {
        //deletes card using deleteCard function with cardId as argument, then uses loadDeck to pull deck information
        deleteCard(cardId).then(loadDeck); 
      } catch (error) {
        console.error("Error deleting card:", error);
      }
    }
  }

  return (
    <main className="container deck-view">
      <nav className="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <span className="oi oi-home" /> Home
            </Link>
          </li>
          <li className="breadcrumb-item active">{deck.name}</li>
        </ol>
      </nav>

      <div className="media mb-2">
        <div className="media-body">
          <h5 className="mb-1">{deck.name}</h5>
          {deck.description}
        </div>
      </div>
      <Link
        to={`/decks/${deck.id}/edit`}
        className="btn btn-secondary mr-2"
        title="Edit deck"
      >
        <span className="oi oi-pencil" /> Edit
      </Link>
      <Link
        to={`/decks/${deck.id}/study`}
        className="btn btn-primary mr-2"
        title="Study deck"
      >
        <span className="oi oi-book" /> Study
      </Link>
      <Link
        to={`/decks/${deck.id}/cards/new`}
        className="btn btn-primary"
        title="Add Card"
      >
        <span className="oi oi-plus" /> Add Cards
      </Link>
      <button
        className="btn btn-danger float-right"
        title="Delete deck"
        onClick={() => handleDelete(deck.id)}
      >
        <span className="oi oi-trash" />
      </button>

      <div className="Deck container">
        <CardList deck={deck} deleteCardHandler={deleteCardHandler} />
      </div>
    </main>
  );
}
export default DeckView;
