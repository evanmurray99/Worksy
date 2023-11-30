import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/NavBar.css";
export default function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const routeToResult = () => {
    if (query.trim() !== "") {
      navigate(`/services/query/${query}`);
    }
  };

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      routeToResult(query);
    }
  };

  return (
    <div className="searchContainer">
      <input
        className="searchField"
        type="text"
        placeholder="Enter keywords here"
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        onKeyDown={handleEnter}
      ></input>
      <button
        className="searchButton"
        onClick={() => {
          routeToResult(query);
        }}
        id="search"
      >
        Search
      </button>
    </div>
  );
}
