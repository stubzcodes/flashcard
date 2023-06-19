import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../src/utils/api";

function EditDeck() {
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState({ cards: [] });
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

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
      const updatedDeck = { ...deck, ...formData };
      await updateDeck(updatedDeck);
      history.push(`/decks/${deckId}`);
    } catch (error) {
      console.error("Error updating deck:", error);
    }
  }

  return (
    <main className="container edit-view">
      <nav className="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <span className="oi oi-home" /> Home
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active">Edit Deck</li>
        </ol>
      </nav>

      <h1>Edit Deck</h1>

      <form onSubmit={(event) => submitHandler(event)}>
        <div className="mb5">
          <label htmlFor="name">Name</label>
          <br></br>
          <input
            className="name-input mb-3"
            id="name"
            type="text"
            name="name"
            onChange={handleChange}
            value={formData.name}
            placeholder={deck.name}
          />
        </div>

        <div className="mb3">
          <label htmlFor="description">Description</label>
          <br></br>
          <textarea
            className="desc-input"
            id="description"
            type="textarea"
            name="description"
            onChange={handleChange}
            value={formData.description}
            placeholder={deck.description}
          ></textarea>
        </div>
        <Link to={"/"} className="btn btn-secondary" title="Cancel">
          Cancel
        </Link>
        <button className="btn btn-primary ml-2" type="submit">
          Submit
        </button>
      </form>
    </main>
  );
}

export default EditDeck;
