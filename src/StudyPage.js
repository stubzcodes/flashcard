import React from "react";
import { Link } from "react-router-dom";

function StudyPage({ deckId, name, children }) { //breadcrumb nav and container for study card logic
  return (
    <main>
      <nav className="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <span className="oi oi-home" /> Home
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{name}</Link>
          </li>
          <li className="breadcrumb-item active">Study</li>
        </ol>
      </nav>
      <h1>{name}: Study</h1>
      {children}
    </main>
  );
}

export default StudyPage;
