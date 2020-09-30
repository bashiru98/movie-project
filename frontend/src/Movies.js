import React, { Component } from "react";

import "./Movies.css";
const pictures_api = "https://image.tmdb.org/t/p/w1280";
class Movies extends Component {
  state = {};
  render() {
    const { title, poster_path, overview, vote_average } = this.props;

    return (
      <div className="movies">
        <img src={pictures_api + poster_path} alt="" />
        <div className="movie-info">
          <h3>{title}</h3>
          <span>{vote_average}</span>
        </div>
        <div className="movie-details">
          <h2>Details:</h2>
          <p>{overview}</p>
        </div>
      </div>
    );
  }
}

export default Movies;
