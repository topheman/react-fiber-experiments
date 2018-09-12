import React, { Fragment } from "react";
import { Link } from "@reach/router";

const AboutContainer = () => (
  <Fragment>
    <p>
      <Link to="/">
        <span role="img" aria-label="home">
          🏠 Home
        </span>
      </Link>
      {" > "}
      <strong>About</strong>
    </p>
    <h2>About</h2>
    <p>Some infos ...</p>
  </Fragment>
);

export default AboutContainer;
