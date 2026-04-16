import React, { useContext } from "react";
import { AppContext } from "../context";
import { useHistory } from "react-router-dom";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import DeleteIcon from "@material-ui/icons/Delete";
import errorImage from "../errorImage.png";
import "../styles/Watchlist.css";

const Watchlist = () => {
  const { watchlist, removeFromWatchlist } = useContext(AppContext);
  const history = useHistory();

  if (watchlist.length === 0) {
    return (
      <div className="watchlist-empty">
        <BookmarkIcon style={{ fontSize: 80, color: "rgba(255,255,255,0.2)" }} />
        <h2>Your watchlist is empty</h2>
        <p>Search for movies and bookmark them to save here.</p>
        <button onClick={() => history.push("/")} className="browse-btn">
          Browse Movies
        </button>
      </div>
    );
  }

  return (
    <div className="watchlist-page">
      <h2 className="watchlist-heading">
        My Watchlist <span>({watchlist.length})</span>
      </h2>
      <div className="watchlist-grid">
        {watchlist.map((movie) => (
          <div key={movie.imdbID} className="watchlist-item">
            <img
              src={movie.Poster === "N/A" ? errorImage : movie.Poster}
              alt={movie.Title}
              onClick={() => history.push(`/movies/${movie.imdbID}`)}
            />
            <div className="watchlist-info">
              <p className="wl-title" onClick={() => history.push(`/movies/${movie.imdbID}`)}>
                {movie.Title}
              </p>
              <p className="wl-year">{movie.Year}</p>
            </div>
            <button
              className="remove-btn"
              onClick={() => removeFromWatchlist(movie.imdbID)}
              title="Remove"
            >
              <DeleteIcon style={{ fontSize: 20 }} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Watchlist;