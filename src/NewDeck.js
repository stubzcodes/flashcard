import { Link } from "react-router-dom";
import React from "react";
import { useHistory } from "react-router-dom";
import { createDeck } from "../src/utils/api";
import DeckForm from "./DeckForm"

function NewDeck() {
  const history = useHistory()

  function cancel() {
    history.goBack()
  }

  function submitHandler (deck) {
    //add new data to deck data
    createDeck(deck).then((response) => history.push(`/decks/${response.id}`)) //take user to new deck id page

    // console.log("444444", event)
    // event.preventDefault();
    // //add new data to deck data
    // const abortController = new AbortController();
    // const response = await createDeck({ ...formData }, abortController.signal)
    // console.log("8888888", response)
    // //take user to new deck id page
    // history.push(`/decks/${response.id}`)
    // return response
    };

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
     />
    </main>
  );
}

export default NewDeck;