import React from "react";
import { Link } from "react-router-dom";

function CardList({ deck, onCardDelete }) {
  const { cards = [] } = deck;

  const listCards = cards.map((card) => (
    <li
      key={card.id}
      className="list-group-item list-group-item-action flex-column align-items-start"
    >
      <div className="row">
        <div className="col-md-10">
          <div className="row">
            <div className="col">{card.front}</div>
            <div className="col">{card.back}</div>
          </div>
        </div>
        <div className="col text-right">
          <Link
            to={`/decks/${deck.id}/cards/${card.id}/edit`}
            className="btn btn-secondary mr-2"
            title="Edit Card"
          >
            <span className="oi oi-pencil" /> Edit
          </Link>
          <button
            className="btn btn-danger"
            title="Delete card"
            onClick={() => onCardDelete(card.id)}
          >
            <span className="oi oi-trash" />
          </button>
        </div>
      </div>
    </li>
  ));

  return (
    <div className="mt-4 card-list">
      <h2>Cards</h2>
      <ul className="list-group">{listCards}</ul>
    </div>
  );
}
export default CardList;
