import React, { useState } from "react";

function DeckForm({
  onSubmit,
  onCancel,
  initialState = { name: "", description: "" },
  submitLabel,
  cancelLabel,
}) {
  // Declares state variable deck with initial state initialState
  const [deck, setDeck] = useState(initialState);

  function handleChange({ target: { name, value } }) {
    setDeck((prevState) => ({
      ...prevState,
      [name]: value,
    }));// Updates the deck state by merging the previous state with the new name-value pair

  }

  function submitHandler(event) {
    event.preventDefault();
    onSubmit(deck);// Calls the onSubmit function with the deck state as the argument

  }
  return (
    <div>
      <form onSubmit={submitHandler}>
        <fieldset>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              className="form-control"
              id="name"
              type="text"
              name="name"
              onChange={handleChange}
              value={deck.name}
              placeholder="Deck Name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              row="4"
              id="description"
              name="description"
              onChange={handleChange}
              value={deck.description}
              placeholder="Brief description of the deck"
            />
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary mr-2"
          >
            {cancelLabel}
          </button>
          <button className="btn btn-primary" type="submit">
            {submitLabel}
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default DeckForm;
