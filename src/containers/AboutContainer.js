import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import { withStyles } from "@material-ui/core";
import preval from "preval.macro";

// the following uses preval.macro which will be executed at build time

const hash = preval`
  module.exports = require(__dirname + '/../../react-modules/infos.json').hash;
`;
const reactModules = preval`
  module.exports = require('../scripts/react-modules-infos')();
`;
const facebookReactRepoCommit = `https://github.com/facebook/react/commit/${hash}`;

// we could have gone one step further with codegen by directly generating jsx
// it would have been too much for this case and caused more indirection

const styles = {
  reactModuleInfos: {
    fontSize: "85%"
  },
  reactModuleName: {
    fontSize: "1.15em",
    fontWeight: "bold"
  }
};

const AboutContainer = ({ classes }) => (
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
    <ul>
      <li>
        <span role="img" aria-label="post">
          📔
        </span>
        <a href="http://dev.topheman.com/discover-react-suspense/">Blog post</a>
      </li>
      <li>
        <span role="img" aria-label="post">
          📺
        </span>
        <a href="https://youtu.be/BRxr9IhN1ww">
          Watch a recording of end to end tests with Cypress
        </a>
      </li>
    </ul>
    <h3>React custom build</h3>
    <p>
      To try the latest features of React Fiber (such as <em>Suspense</em> or{" "}
      <em>Time Slicing</em>
      ), you will need to make your own custom build of React.
    </p>
    <p>
      It is shipped with this project in the{" "}
      <a href="https://github.com/topheman/react-fiber-experiments/tree/master/react-modules">
        react-modules
      </a>{" "}
      folder (where you will find the instructions on how to make your own build
      if you want to).
    </p>
    <p>
      The following modules where built in <code>suspense</code> mode from{" "}
      <a href={facebookReactRepoCommit}>
        this commit in the facebook/react repo
      </a>
      .
    </p>
    <p>The following modules where built:</p>
    <ul>
      {Object.entries(reactModules).map(([name, { version, description }]) => (
        <li
          key={name}
          className={classes.reactModuleInfos}
          data-testid={`module-infos-${name}`}
        >
          <span className={classes.reactModuleName}>{name}</span>@
          <span>{version}</span> - <span>{description}</span>
        </li>
      ))}
    </ul>
  </Fragment>
);
AboutContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AboutContainer);
