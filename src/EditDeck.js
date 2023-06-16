import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../src/utils/api";
import DeckForm from "./DeckForm"

function EditDeck() {
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState({  name: "", description: "", });

  useEffect(() => {
    readDeck(deckId).then(setDeck);
  }, [deckId]);

  function submitHandler(updatedEditDeck) {
    updateDeck(updatedEditDeck).then((response) =>  history.push(`/decks/${response.id}`))
    // try {
    //   const updatedDeck = { ...deck, ...formData };
    //   await updateDeck(updatedDeck);
    //   history.push(`/decks/${deckId}`);
    // } catch (error) {
    //   console.error("Error updating deck:", error);
    // }
  }

  function cancel() {
    history.goBack()
  }

  const editData = deck.id ? (
    <DeckForm
        onCancel={cancel}
        onSubmit={submitHandler}
        initialState={deck}
    />
  ) : (
    <p>Loading.....</p>
  )

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
      {editData}
    </main>
  );
}

export default EditDeck;