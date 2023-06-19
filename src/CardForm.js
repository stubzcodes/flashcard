import React, { useState } from "react";

function CardForm({
  onSubmit,
  onDone,
  deckName = "Loading....",
  initialState,
  doneButtonTitle = "Done",
}) {
  const [card, setCard] = useState(initialState);

  function handleChange({ target: {name, value}}) {
    setCard((prevState) => ({ ...prevState, [name]: value }));
  }

  function submitHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    onSubmit({ ...card });
    setCard({ front: "", back: "" });
  }
  console.log(initialState)
  return (
    <form onSubmit={submitHandler} className="card-form">
      <fieldset>
        <legend>{deckName}: Add Card</legend>
        <div className="form-group">
          <label htmlFor="front">Front</label>
          <textarea
            className="form-control"
            id="front"
            type="textarea"
            tabIndex="1"
            name="front"
            required={true}
            value={card.front}
            placeholder="Front side of card"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="back">Back</label>
          <textarea
            className="form-control"
            id="back"
            tabIndex="2"
            name="back"
            required={true}
            value={card.back}
            placeholder="Back side of card"
            onChange={handleChange}
          />
        </div>
        <button
          className="btn btn-secondary mr-2"
          tabIndex="4"
          onClick={onDone}
        >
          {doneButtonTitle}
        </button>
        <button className="btn btn-primary" type="submit" tabIndex="3">
          Save
        </button>
      </fieldset>
    </form>
  );
}

export default CardForm;
