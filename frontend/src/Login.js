import React, { Component, Fragment } from "react";
import "./Movies.css";
import "./Login.css";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import Movies from "./Movies";
firebase.initializeApp({
  apiKey: "AIzaSyDhGk3yjtQhp87MlsyPNuXBReyGFp6SdGA",
  authDomain: "movies-app-fcbde.firebaseapp.com",
});

const movies_api =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const searchQuery_api =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

class Login extends Component {
  state = { isSignedIn: false, movies: [], searchQuery: "" };

  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccess: () => false,
    },
  };
  componentDidMount = async () => {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ isSignedIn: !!user });
    });

    const response = await fetch(movies_api);
    const data = await response.json();
    this.setState({ movies: data.results });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(searchQuery_api + this.state.searchQuery);
    const data = await response.json();
    this.setState({ movies: data.results });
  };
  handleLogOut = () => {
    firebase.auth().signOut();
  };
  handleChange = (e) => {
    this.setState({ searchQuery: e.target.value });
  };
  render() {
    const { movies } = this.state;

    return (
      <Fragment>
        {this.state.isSignedIn ? (
          <Fragment>
            <header>
              <form onSubmit={this.handleSubmit}>
                <input
                  className="search"
                  type="search"
                  value={this.state.searchQuery}
                  placeholder="search..."
                  onChange={this.handleChange}
                />
              </form>
              <ul className="main-nav">
                <li>
                  <button onClick={this.handleLogOut}>logout</button>
                </li>
                <li>
                  <img src={firebase.auth().currentUser.photoURL} alt="" />
                </li>
                <li>
                  <button>{firebase.auth().currentUser.displayName}</button>
                </li>
              </ul>
            </header>
            <div className="container">
              {movies.map((movie) => (
                <Movies {...movie} key={movie.id} />
              ))}
            </div>
          </Fragment>
        ) : (
          <div className="login">
            <h1>welcome </h1>
            <h2>To Bash Movies </h2>
            <StyledFirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
            />
          </div>
        )}
      </Fragment>
    );
  }
}

export default Login;
