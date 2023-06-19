import { Link, useParams } from "react-router-dom";
import React, { useState } from "react";
import { readDeck, updateDeck, createCard } from "../src/utils/api";
import { useEffect } from "react";

function AddCard() {
  const [formData, setFormData] = useState({
    front: "",
    back: "",
  });
  const { deckId } = useParams();
  const [deck, setDeck] = useState({ cards: [] });

  useEffect(() => {
    loadDeck();
  }, [deckId]);

  function loadDeck() {
    try {
      readDeck(deckId).then(setDeck);
    } catch (error) {
      console.error("Error loading deck:", error);
    }
  }

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  async function submitHandler(event) {
    event.preventDefault();

    try {
      await createCard(deck.id, formData);
      setFormData({
        front: "",
        back: "",
      });
    } catch (error) {
      console.error("Error updating deck:", error);
    }
  }

  return (
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
          <li className="breadcrumb-item active">Add Card</li>
        </ol>
      </nav>

      <h1>{`${deck.name}: Add Card`}</h1>

      <form onSubmit={submitHandler}>
        <div className="mb5">
          <label htmlFor="front">Front</label>
          <br></br>
          <textarea
            className="front-input mb-3"
            id="front"
            type="textarea"
            name="front"
            value={formData.front}
            placeholder="Front side of card"
            onChange={handleChange}
          />
        </div>
        <div className="mb5">
          <label htmlFor="back">Back</label>
          <br></br>
          <textarea
            className="back-input mb-3"
            id="back"
            type="textarea"
            name="back"
            value={formData.back}
            placeholder="Back side of card"
            onChange={handleChange}
          />
        </div>
        <Link
          to={`/decks/${deckId}`}
          className="btn btn-secondary"
          title="Done"
        >
          Done
        </Link>
        <button className="btn btn-primary ml-2" type="submit">
          Save
        </button>
      </form>
    </main>
  );
}

export default AddCard;
