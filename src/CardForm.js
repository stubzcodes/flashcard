import React, { useState, useEffect } from "react";

//shared card form for add and edit card routes
function CardForm({
  //allows props to be passed from add and edit card routes
  onSubmit,
  onCancel,
  initialState,
  submitLabel,
  cancelLabel,
}) {
  const [card, setCard] = useState(initialState);

  // Updates card state when initialState prop changes
  useEffect(() => {
    setCard(initialState); 
  }, [initialState]);


function handleChange(event) {
  // Extracts the name and value from the event target (input element)
  const { name, value } = event.target;

  // Updates the card state based on the changed field
  setCard((prevState) => ({
    ...prevState,    // Preserves the previous state properties
    [name]: value,   // Updates the field with the new value
  }));
}


  function submitHandler(event) {
    //prevents default from button press
    event.preventDefault();
    //calls onSubmit and passes card as an argument
    onSubmit(card);
  }
  return (
    <div>
      <form onSubmit={submitHandler}>
        <fieldset>
          <div className="form-group">
            <label htmlFor="front">Front</label>
            <input
              className="form-control"
              id="front"
              type="text"
              name="front"
              onChange={handleChange}
              value={card.front}
              placeholder="Front side of card"
            />
          </div>

          <div className="form-group">
            <label htmlFor="back">Back</label>
            <textarea
              className="form-control"
              row="4"
              id="back"
              name="back"
              onChange={handleChange}
              value={card.back}
              placeholder="Back side of card"
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

export default CardForm;
