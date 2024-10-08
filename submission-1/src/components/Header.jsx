import React from "react";
import Navigation from "./Navigation";

function Header() {
  return (
    <header className="note-app__header">
      <h1>Notes App</h1>
      <Navigation />
    </header>
  );
}

export default Header;
