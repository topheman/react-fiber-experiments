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
    <p>
      <span role="img" aria-label="post">
        📔
      </span>
      <a href="http://dev.topheman.com/discover-react-suspense/">Blog post</a>
    </p>
  </Fragment>
);

export default AboutContainer;
