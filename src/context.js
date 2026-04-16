import React, { createContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
export const API_ENDPOINT = `${process.env.REACT_APP_API_URL}?apikey=${process.env.REACT_APP_OMDB_API_KEY}&`;

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [searchMovie, setSearchMovie] = useState("avengers");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState(null); // { message, type }

  // Watchlist — persisted in localStorage
  const [watchlist, setWatchlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("watchlist")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  // Toast auto-dismiss
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type });
  }, []);

  const addToWatchlist = useCallback(
    (movie) => {
      setWatchlist((prev) => {
        if (prev.find((m) => m.imdbID === movie.imdbID)) return prev;
        showToast(`"${movie.Title}" added to watchlist ✓`);
        return [...prev, movie];
      });
    },
    [showToast]
  );

  const removeFromWatchlist = useCallback(
    (imdbID) => {
      setWatchlist((prev) => {
        const movie = prev.find((m) => m.imdbID === imdbID);
        if (movie) showToast(`"${movie.Title}" removed`, "remove");
        return prev.filter((m) => m.imdbID !== imdbID);
      });
    },
    [showToast]
  );

  const isInWatchlist = useCallback(
    (imdbID) => watchlist.some((m) => m.imdbID === imdbID),
    [watchlist]
  );

  useEffect(() => {
    setIsLoading(true);
    const getMovies = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINT}s=${searchMovie}`);
        setMovies(response.data.Search || null);
      } catch (err) {
        setMovies(null);
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    getMovies();
  }, [searchMovie]);

  return (
    <AppContext.Provider
      value={{
        movies,
        setSearchMovie,
        isLoading,
        searchMovie,
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        isInWatchlist,
        toast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};