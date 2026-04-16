import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import "../styles/Movies.css";
import errorImage from "../errorImage.png";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import { AppContext } from "../context";

const Movies = ({ movie }) => {
  const history = useHistory();
  const { imdbID, Poster, Title, Year } = movie;
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } =
    useContext(AppContext);
  const saved = isInWatchlist(imdbID);

  const handleWatchlist = (e) => {
    e.stopPropagation(); // prevent navigating to movie page
    saved ? removeFromWatchlist(imdbID) : addToWatchlist(movie);
  };

  return (
    <div className="Movies" onClick={() => history.push(`/movies/${imdbID}`)}>
      <div className="movie-img-wrapper">
        <img src={Poster === "N/A" ? errorImage : Poster} alt={Title} />
        <div className="movie-overlay">
          <button
            className={`bookmark-btn ${saved ? "saved" : ""}`}
            onClick={handleWatchlist}
            title={saved ? "Remove from watchlist" : "Add to watchlist"}
          >
            {saved ? (
              <BookmarkIcon style={{ fontSize: 20 }} />
            ) : (
              <BookmarkBorderIcon style={{ fontSize: 20 }} />
            )}
          </button>
          <span className="overlay-label">View Details</span>
        </div>
      </div>
      <p className="movie-title">{Title}</p>
      <p className="movie-year">{Year}</p>
    </div>
  );
};

export default Movies;