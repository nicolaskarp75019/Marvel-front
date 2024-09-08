import React, { useState, useEffect } from "react";
import axios from "axios";
import "../src/App.css";
import { isFavorite, addFavorite, removeFavorite } from "../src/localStorage";

const ComicsPage = () => {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchComics = async () => {
      try {
        setLoading(true);
        const API_URL =
          process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

        const response = await axios.get(`${API_URL}/api/comics`, {
          params: {
            limit: 100,
            skip: (page - 1) * 100,
            title: search,
          },
        });
        setComics(response.data.results);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchComics();
  }, [page, search]);

  const handleFavoriteClick = (comic) => {
    if (isFavorite("comics", comic._id)) {
      removeFavorite("comics", comic._id);
    } else {
      addFavorite("comics", comic);
    }
    setComics([...comics]);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container">
      <h1>COMICS</h1>
      <input
        type="text"
        placeholder="Search by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid">
        {comics.map((comic) => (
          <div className="card" key={comic._id}>
            <img
              src={`${comic.thumbnail.path}/portrait_medium.${comic.thumbnail.extension}`}
              alt={comic.title}
            />
            <h2>{comic.title}</h2>
            <p>{comic.description}</p>
            <button
              className="button"
              onClick={() => handleFavoriteClick(comic)}
            >
              {isFavorite("comics", comic._id)
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

export default ComicsPage;
