import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";

import NetworkSlider from "../components/NetworkSlider";

/**
 * This component is mounted by the router at `/regular`
 * It wrapps children described with `path` prop so they respond to router changes
 * In the header: a relative link! To go back to this component
 */
const RegularContainer = ({ children, location }) => {
  const REGEXP_MATCH = /\/course(\/.*)?/;
  // const baseUrl = location.pathname.replace(REGEXP_MATCH, "");
  let relativeUrl = location.pathname.match(REGEXP_MATCH);
  if (relativeUrl) {
    [relativeUrl] = relativeUrl;
  }
  return (
    <div>
      <p>
        <Link to="/">
          <span role="img" aria-label="home">
            🏠️ Home
          </span>
        </Link>
        {" > "}
        <Link to="..">Suspense</Link>
        {" > "}
        <Link to="./">
          <strong>Regular</strong> rendering
        </Link>{" "}
        (current APIs)
        {relativeUrl && <span>{` > ${relativeUrl}`}</span>}
      </p>
      <h2>Regular rendering</h2>
      <NetworkSlider
        render={({ networkMode }) => {
          if (relativeUrl) {
            const explanations = {
              slowNetwork: (
                <Fragment>
                  <p>
                    On a low connexion, we have one spinner (and eventually a{" "}
                    <span style={{ color: "blue" }}>blue spinner</span> if this
                    is first load, due to chunk lazy loading)
                  </p>
                </Fragment>
              ),
              fastNetwork: (
                <Fragment>
                  <p>
                    When you have a fast network, you see{" "}
                    <strong>each spinner flash for a few seconds</strong>.
                  </p>
                </Fragment>
              ),
              slowEndPoint: (
                <Fragment>
                  <p>
                    On a slow endpoint we have <strong>two spinners</strong>:
                  </p>
                  <ul>
                    <li>First Spinner for lessons list flashes</li>
                    <li>
                      Second spinner for next lesson signals the user it has to
                      wait
                    </li>
                  </ul>
                </Fragment>
              )
            };
            return explanations[networkMode];
          }
          return null;
        }}
      />
      {children}
    </div>
  );
};

RegularContainer.propTypes = {
  // can't put .isRequired - Router seems to not only clone but also render Router children
  // which leeds to propTypes validation before the componenent is mounted on route match
  // https://github.com/reach/router/blob/master/src/index.js#L223-L226
  location: PropTypes.object, // from the Router
  children: PropTypes.node.isRequired
};
RegularContainer.defaultProps = {
  location: undefined
};

export default RegularContainer;
