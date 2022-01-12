import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const App = () => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("react hooks");
  useEffect(() => {
    fetchData();
  }, []);
  const [loading, setLoading] = useState(false);
  const searchInputRef = useRef();
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://hn.algolia.com/api/v1/search?query=${query}`
      );
      setResults(response.data.hits);
    } catch (err) {
      setError(err);
    }

    setLoading(false);
  };
  const handleSearch = (event) => {
    event.preventDefault();
    fetchData();
  };
  const handleClearSearch = (event) => {
    setQuery("");
    searchInputRef.current.focus();
  };
  return (
    <div className="container max-w-md mx-auto p-4 m-2 bg-purple-100 shadow-lg rounded">
      <img
        src="../public/favicon.ico"
        alt="React Logo"
        className="float-right h-12"
      />
      <h1 className="text-gray-500 font-thin font-bold">Hooks News</h1>
      <form onSubmit={handleSearch} className="border p-1 rounder">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          ref={searchInputRef}
        />
        <button type="submit" className="bg-green-200 rounded m-1 p-1">
          Search
        </button>
        <button
          type="button"
          onClick={handleClearSearch}
          className="bg-blue-400 text-white rounded m-1 p-1"
        >
          Clear
        </button>
      </form>

      {loading ? (
        <div className="font-bold text-gray-800">Loading Results......</div>
      ) : (
        <ul className="list-reset leading-normal">
          {results.map((result) => (
            <li key={result.objectID}>
              <a
                href={result.url}
                className="text-indigo-400 hover:text-indigo-800"
              >
                {result.title}
              </a>
            </li>
          ))}
        </ul>
      )}
      {error && <div className="text-red font-bold">{error.message}</div>}
    </div>
  );
};

export default App;
