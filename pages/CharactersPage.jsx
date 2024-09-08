import React, { useState, useEffect } from "react";
import axios from "axios";
import "../src/App.css";
import { isFavorite, addFavorite, removeFavorite } from "../src/localStorage";

const CharactersPage = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        const API_URL =
          process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

        const response = await axios.get(`${API_URL}/api/characters`, {
          params: {
            limit: 100,
            skip: (page - 1) * 100,
            name: search,
          },
        });

        setCharacters(response.data.results);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [page, search]);

  const handleFavoriteClick = (character) => {
    if (isFavorite("characters", character._id)) {
      removeFavorite("characters", character._id);
    } else {
      addFavorite("characters", character);
    }
    setCharacters([...characters]);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container">
      <h1>CHARACTERS</h1>
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid">
        {characters.map((character) => (
          <div className="card" key={character._id}>
            <img
              src={`${character.thumbnail.path}/portrait_medium.${character.thumbnail.extension}`}
              alt={character.name}
            />
            <h2>{character.name}</h2>
            <p>{character.description}</p>
            <button
              className="button"
              onClick={() => handleFavoriteClick(character)}
            >
              {isFavorite("characters", character._id)
                ? "Remove from Favorites"
                : "Add to Favorites"}
            </button>
          </div>
        ))}
      </div>
      <div>
        <button
          className="button"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button className="button" onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default CharactersPage;
