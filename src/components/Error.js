import React from "react";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

const Error = ({ searchTerm }) => {
  return (
    <div className="error">
      <ErrorOutlineIcon />
      <h1>No results found</h1>
      {searchTerm ? (
        <p>We couldn't find anything for <strong>"{searchTerm}"</strong>. Try a different title.</p>
      ) : (
        <p>Sorry, we couldn't find any results.</p>
      )}
    </div>
  );
};

export default Error;