import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  componentDidMount() {}
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to my-react-app-starter</h1>
        </header>
        <p>
          An unejected create-react-app generated project with the following
          features:
        </p>
        <ul
          style={{
            textAlign: "left",
            lineHeight: "1.5rem",
            maxWidth: 510,
            marginLeft: "auto",
            marginRight: "auto"
          }}
        >
          <li>eslint / prettier / config airbnb</li>
          <li>
            injected metadatas infos of the generated build (time, git hash,
            version)
          </li>
          <li>generate changelog npm task</li>
          <li>
            default <code>.travis.yml</code>
          </li>
          <li>deploy to github pages npm task</li>
        </ul>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p style={{ marginTop: 40 }}>
          <a
            href="https://github.com/topheman/my-react-app-starter"
            className="App-button"
            title="topheman/my-react-app-starte on github"
          >
            fork me on github
          </a>
        </p>
        <footer className="App-footer">
          v{process.env.REACT_APP_METADATAS_VERSION}
        </footer>
      </div>
    );
  }
}

export default App;
