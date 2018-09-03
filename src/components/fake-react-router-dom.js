/**
 * This is a placeholder until installing a router that comes with a Link component
 */

import React from "react";
import PropTypes from "prop-types";

export function Link({ to, children, ...remainingProps }) {
  return (
    <a href={to} {...remainingProps}>
      {children}
    </a>
  );
}
Link.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export function MemoryRouter({ children }) {
  return children;
}
