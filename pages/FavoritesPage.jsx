import React from "react";
import { getFavorites } from "../src/localStorage";
import "../src/App.css";

const FavoritesPage = () => {
  const favoriteCharacters = getFavorites("characters");
  const favoriteComics = getFavorites("comics");

  return (
    <div className="container">
      <h1>MY FAVORITES CHARACTERS & COMICS</h1>

      <h2>Favorite Characters</h2>
      <div className="grid">
        {favoriteCharacters.map((character) => (
          <div className="card" key={character._id}>
            <h2>{character.name}</h2>
            <img
              src={`${character.thumbnail.path}/portrait_medium.${character.thumbnail.extension}`}
              alt={character.name}
            />
            <p>{character.description}</p>
          </div>
        ))}
      </div>

      <h2>Favorite Comics</h2>
      <div className="grid">
        {favoriteComics.map((comic) => (
          <div className="card" key={comic._id}>
            <h2>{comic.title}</h2>
            <img
              src={`${comic.thumbnail.path}/portrait_medium.${comic.thumbnail.extension}`}
              alt={comic.title}
            />
            <p>{comic.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
