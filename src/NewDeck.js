import { Link } from "react-router-dom";
import React from "react";
import { useHistory } from "react-router-dom";
import { createDeck } from "../src/utils/api";
import DeckForm from "./DeckForm";

function NewDeck() {
  const history = useHistory();
  const submitLabel = "Submit";
  const cancelLabel = "Cancel";

  function cancel() {
    history.goBack(); //send user back after cancel
  }

  function submitHandler(deck) {
    //adds new data to deck data
    createDeck(deck).then((response) => history.push(`/decks/${response.id}`)); //take user to new deck id page
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
          <li className="breadcrumb-item active">Create Deck</li>
        </ol>
      </nav>
      <h1>Create Deck</h1>

      <DeckForm
        onCancel={cancel}
        onSubmit={submitHandler}
        submitLabel={submitLabel}
        cancelLabel={cancelLabel}
      />
    </main>
  );
}

export default NewDeck;
