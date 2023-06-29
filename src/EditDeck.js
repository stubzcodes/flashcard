import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../src/utils/api";
import DeckForm from "./DeckForm";

function EditDeck() {
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState({ cards: [] });

  useEffect(() => {
    loadDeck(); //calls loadDeck with deckId dependency
  }, [deckId]);

  async function loadDeck() {
    //loads deck information with readDeck, and sets that information to setDeck with the response
    try {
      const response = await readDeck(deckId); 
      setDeck(response);
    } catch (error) {
      console.error("Error loading deck:", error);
    }
  }

  function cancel() {
    history.goBack() //sends user back a page when cancel button is pressed
  }

  async function submitHandler(submittedDeck) {
    try {
      await updateDeck(submittedDeck); //updates deck using api function and submittedDeck argument
      history.push(`/decks/${deckId}`); //sends user to deck page
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

      {deck.id && <DeckForm 
        submitLabel={"Submit"} 
        cancelLabel={"Cancel"}
        onCancel={cancel}
        onSubmit={submitHandler}
        initialState={deck}
        />}
    </main>
  );
}

export default EditDeck;
