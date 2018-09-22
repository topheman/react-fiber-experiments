import React, { Fragment } from "react";
import { Link } from "@reach/router";
import PropTypes from "prop-types";

export const SuspenseExplanation = ({ header }) => (
  <Fragment>
    {header && (
      <p>
        <Link to="/">
          <span role="img" aria-label="home">
            🏠 Home
          </span>
        </Link>
        {" > "}
        <Link to="..">
          <strong>Suspense</strong>
        </Link>
      </p>
    )}
    <h3>Suspense</h3>
    <ol>
      <li>
        <Link to="/suspense/regular-rendering">Regular rendering</Link> (current
        APIs)
      </li>
      <li>
        <Link to="/suspense/async-rendering">Async rendering</Link>{" "}
        (experimental APIs)
      </li>
      <li>
        <Link to="/suspense/placeholder">Play with Placeholder</Link>
      </li>
    </ol>
  </Fragment>
);
SuspenseExplanation.propTypes = {
  header: PropTypes.bool
};
SuspenseExplanation.defaultProps = {
  header: false
};

const HomeContainer = () => (
  <div>
    <p>
      <span role="img" aria-label="home">
        🏠
      </span>{" "}
      Welcome
    </p>
    <p>
      This project is about publishing{" "}
      <strong>
        examples of <em>react fiber</em>
        &apos;s new features
      </strong>
      , not only the <strong>code part</strong>, but also to highlight what we
      may <strong>benefit on the UI/UX part</strong>.
    </p>
    <p>
      <span role="img" aria-label="video">
        📺
      </span>{" "}
      Before starting, checkout this{" "}
      <a href="http://dev.topheman.com/discover-react-suspense/">
        video for explanations about React Suspense
      </a>
    </p>
    <SuspenseExplanation />
  </div>
);

export default HomeContainer;
