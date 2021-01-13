import React from "react";
import "./style.css";

function SearchResults(props) {
  return (
    <ul className="list-group search-results">
      {props.results.map(result => (
        <li key={result.email} className="list-group-item">
          <p>{result.name.title}</p>
          <img alt="Employee" src={result} className="img-fluid" />
        </li>
      ))}
    </ul>
  );
}

export default SearchResults;
