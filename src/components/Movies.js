import React, { useState, useEffect } from "react";
import "../App.css";
import { env } from '../env.js';
import { apiConfig } from '../apiConfig.js';

export const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    getAllMovies();
  }, []);

  const getAllMovies = async () => {
    try {
      const response = await fetch(`${apiConfig[env].API_URL}/api/movie/all`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiConfig[env].bearer_token}`,
        }
      });

      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error('Error fetching all movies:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`${apiConfig[env].API_URL}/api/movie/search?search_text=${searchText}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiConfig[env].bearer_token}`,
        }
      });

      const data = await response.json();

      if (data.returnCode === 1) {
        setSearchResults(data.data);
        setIsSearching(true);
      } else {
        setSearchResults([]);
        setIsSearching(false);
      }
    } catch (error) {
      console.error('Error searching for movies:', error);
    }
  };

  const movieData = isSearching ? searchResults : movies;

  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
        <div>
          <h2>Movies</h2>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="text"
              className="Search_input"
              style={{
                padding: "10px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                width: "300px",
                marginRight: "10px",
              }}
              placeholder="Enter The Title Of Movie"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button
              className="btn btn-warning"
              style={{ padding: "10px", borderRadius: "5px" }}
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <hr />

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Movie Id</th>
            <th>Title</th>
            <th>Genre</th>
            <th>Director</th>
            <th>Release</th>
          </tr>
        </thead>
        <tbody>
          {movieData && movieData.map((movie, index) => (
            <tr key={index} className={index % 2 === 0 ? "odd" : "even"}>
              <td>{index + 1}</td>
              <td>{movie.title}</td>
              <td>{movie.genre}</td>
              <td>{movie.director}</td>
              <td>{movie.release_year}</td>
            </tr>
          ))}
          {isSearching && searchResults.length === 0 && <tr><td colSpan="5">No movies found </td></tr>}
        </tbody>
      </table>
    </div>
  );
};
