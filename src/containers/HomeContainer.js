import React, { Fragment } from "react";
import { Link } from "@reach/router";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import sharedStyles from "../sharedStyles";

const styles = {
  ...sharedStyles,
  card: {
    minWidth: 275,
    maxWidth: "45rem",
    padding: 0,
    backgroundColor: "#00800036",
    margin: "0 auto"
  },
  cardContent: {
    "&:last-child": {
      paddingBottom: 0
    },
    padding: 0,
    paddingLeft: 15
  }
};

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
    <SuspenseExplanation />
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <p>
          <strong>react@16.6.0 update</strong>
        </p>
        <ul>
          <li>
            <code>
              {"<"}
              Placeholder delayMs {"/>"}
            </code>{" "}
            renamed to{" "}
            <code>
              {"<"}
              Suspense maxDuration {"/>"}
            </code>{" "}
            <a href="https://github.com/facebook/react/commit/8af6728c6f105d37f9c0006288a6d1ac3903dc71">
              8af6728
            </a>{" "}
            <a href="https://github.com/facebook/react/commit/d75c69e0cf2a842adc47edab87ca5103411e6949">
              d75c69e
            </a>
          </li>
          <li>
            Removed <code>cache</code> as argument to <code>read</code> from{" "}
            <code>react-cache</code>{" "}
            <a href="https://github.com/facebook/react/pull/13865">#13865</a>
            <br />
            No more direct cache invalidation for the moment
          </li>
        </ul>
      </CardContent>
    </Card>
    <div className={classes.videoWrapper} style={{ marginTop: 20 }}>
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
  </div>
);
HomeContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HomeContainer);
