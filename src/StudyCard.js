import React, { useEffect, useState } from "react";

function StudyCard({card={}, heading, children}) {
  const [viewSide, setViewSide] = useState("front");
  const [flipped, setFlipped] = useState(false);
  const viewNext = {front: "back", back: "front"}

  function handleFlipped() {
    setViewSide((prevState) => viewNext[prevState])
    setFlipped(true);
  }

  useEffect(() => {
    setViewSide("front");
    setFlipped(false);
  }, [card])


  return (
    <div className={`card ${viewSide} study-card`}>
      <div className="card-body">
        <h5 className="card-title">{heading}</h5>
        <p className="card-text">{card[viewSide]}</p>
        <button
          type="button"
          className="btn btn-secondary mr-2"
          onClick={handleFlipped}
        >
          Flip
        </button>
        {flipped && children}
      </div>
    </div>
  );
}

export default StudyCard;
