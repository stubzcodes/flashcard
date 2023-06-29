import React, { useState } from "react";

function DeckForm({
  onSubmit,
  onCancel,
  initialState = { name: "", description: "" },
  submitLabel,
  cancelLabel,
}) {
  const [deck, setDeck] = useState(initialState);

  function handleChange({ target: {name, value} }){
    setDeck((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  function submitHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    onSubmit(deck);
  }
  return (
    <>
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
    </>
  );
}

export default DeckForm;
