import React, { Fragment } from "react";
import { Link } from "@reach/router";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";

import sharedStyles from "../sharedStyles";

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
    <h3>
      {!header && (
        <span role="img" aria-label="this way">
          👉
        </span>
      )}
      Suspense
    </h3>
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
        <Link to="/suspense/placeholder">Play with Suspense</Link>
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

const HomeContainer = ({ classes }) => (
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
    <div className={classes.videoWrapper}>
      <div className={classes.videoContainer}>
        <iframe
          title="Discover React Suspense"
          src="https://www.youtube.com/embed/Nj4q2fHulqc"
          width="560"
          height="315"
          frameBorder="0"
          allowFullScreen="allowfullscreen"
        />
      </div>
    </div>
    <p className={classes.videoDescription}>
      <strong>Watch screencast [en]</strong> /{" "}
      <Link to="/about">Watch talk [fr]</Link>
    </p>
    <SuspenseExplanation />
  </div>
);
HomeContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(sharedStyles)(HomeContainer);
