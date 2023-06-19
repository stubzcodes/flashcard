import { Link, useParams, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { readDeck, readCard, updateCard } from "../src/utils/api";

function EditCard() {
  const history = useHistory();
  const { deckId, cardId } = useParams();
  const [deck, setDeck] = useState({ cards: [] });
  const [card, setCard] = useState({});
  const [formData, setFormData] = useState({
    front: "",
    back: "",
  });

  useEffect(() => {
    loadCard();
    loadDeck();
  }, [deckId, cardId]);

  async function loadDeck() {
    try {
      readDeck(deckId).then(setDeck);
    } catch (error) {
      console.error("Error loading deck:", error);
    }
  }

  console.log(deck)


  async function loadCard() {
    try {
      readCard(cardId).then(setCard);
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
      const updatedCard = { ...card, ...formData };
      await updateCard(updatedCard);
      history.push(`/decks/${deckId}`);
    } catch (error) {
      console.error("Error updating card:", error);
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
          <li className="breadcrumb-item active">Edit Card {card.id}</li>
        </ol>
      </nav>
      <h1>Edit Card</h1>
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
            placeholder={card.front}
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
            placeholder={card.back}
            onChange={handleChange}
          />
        </div>
        <Link
          to={`/decks/${deckId}`}
          className="btn btn-secondary"
          title="Done"
        >
          Cancel
        </Link>
        <button className="btn btn-primary ml-2" type="submit">
          Submit
        </button>
      </form>
    </main>
  );
}

export default EditCard;
