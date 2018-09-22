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
      I think I said everythink in my{" "}
      <a href="http://dev.topheman.com/discover-react-suspense/">
        video / post on React Suspense
      </a>{" "}
      <span role="img" aria-label="smile">
        😉
      </span>{" "}
      ... Maybe I&apos;ll remove this about page ...
    </p>
  </Fragment>
);

export default AboutContainer;
