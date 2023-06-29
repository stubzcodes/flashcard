import { Link, useParams, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { readDeck, createCard } from "../src/utils/api";
import CardForm from "./CardForm";

function AddCard() {
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({
    front: "",
    back: "",
  });

  //calls loadDeck function
  useEffect(() => {
    loadDeck(deckId);
  }, [deckId]);

  //loads deck information using deckId as an argument, sets deck to loaded deck, adds error handler
  async function loadDeck(deckId) {
    try {
      const loadedDeck = await readDeck(deckId);
      setDeck(loadedDeck);
    } catch (error) {
      console.error("Error loading deck:", error);
    }
  }

  //handler for cancel button
  function cancel() {
    history.push(`/decks/${deckId}`);
  }

  //handler for submit button
  //calls createCard from utils using deckId and card
  //clears form for reuse
  //adds error handler
  async function submitHandler(card) {
    try {
      await createCard(deckId, card);
      setCard({ front: "", back: "" });
    } catch (error) {
      console.error("Error creating card:", error);
    }
  }

  return (
    <main>
      {/* breadcrumb navigation */}
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
      {/* heading with deck name */}
      <h1>{`${deck.name}: Add Card`}</h1>
      {/* returns card form component */}
      <CardForm
        onSubmit={submitHandler}
        onCancel={cancel}
        submitLabel={"Save"}
        cancelLabel={"Done"}
        initialState={card}
      />
    </main>
  );
}

export default AddCard;
