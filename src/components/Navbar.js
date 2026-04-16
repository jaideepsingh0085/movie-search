import React, { useContext } from "react";
import Form from "./Form";
import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.css";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import { AppContext } from "../context";

const Navbar = () => {
  const location = useLocation();
  const { watchlist } = useContext(AppContext);

  return (
    <div className="Navbar">
      <div className="container">
        <Link to="/">
          <h1>Movie Search App</h1>
        </Link>
        <div className="nav-right">
          {location.pathname === "/" ? (
            <>
              <Form />
              <Link to="/watchlist" className="watchlist-btn">
                <BookmarkIcon style={{ fontSize: 18 }} />
                Watchlist
                {watchlist.length > 0 && (
                  <span className="watchlist-count">{watchlist.length}</span>
                )}
              </Link>
            </>
          ) : (
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <Link to="/" className="go-home">
                <KeyboardBackspaceIcon /> Home
              </Link>
              <Link to="/watchlist" className="watchlist-btn">
                <BookmarkIcon style={{ fontSize: 18 }} />
                Watchlist
                {watchlist.length > 0 && (
                  <span className="watchlist-count">{watchlist.length}</span>
                )}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;