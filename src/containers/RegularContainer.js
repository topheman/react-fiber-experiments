import React from "react";
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
            🏠️
          </span>
        </Link>
        {" > "}
        <Link to="./">Regular loading section</Link>
        {relativeUrl && <span>{` > ${relativeUrl}`}</span>}
      </p>
      <NetworkSlider />
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
