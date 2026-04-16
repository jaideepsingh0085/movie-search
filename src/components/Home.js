import React, { useContext } from "react";
import { AppContext } from "../context";
import Movies from "./Movies";
import Error from "./Error";
import SkeletonCard from "./SkeletonCard";

const Home = React.memo(() => {
  const { movies, isLoading, searchMovie } = useContext(AppContext);

  if (isLoading) {
    return (
      <div className="Home">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (!movies) {
    return <Error searchTerm={searchMovie} />;
  }

  return (
    <div>
      <p className="results-label">
        Showing results for <span>"{searchMovie}"</span>
      </p>
      <div className="Home">
        {movies.map((movie) => (
          <Movies key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
});

export default Home;