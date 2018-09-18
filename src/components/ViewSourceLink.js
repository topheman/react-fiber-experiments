import React from "react";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import PropTypes from "prop-types";

const BASE_URL =
  "https://github.com/topheman/react-fiber-experiments/tree/master/";

const styles = {
  root: {
    float: "right"
  }
};

const ViewSourceLink = ({
  children,
  classes,
  className,
  filename,
  ...remainingProps
}) => (
  <a
    rel="noopener noreferrer"
    target="_blank"
    className={classNames(classes.root, className)}
    href={`${BASE_URL}${
      filename.startsWith("/") ? filename.substr(1) : filename
    }`}
    title="view source on github"
    {...remainingProps}
  >
    {children}
  </a>
);
ViewSourceLink.propTypes = {
  filename: PropTypes.string.isRequired,
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string
};
ViewSourceLink.defaultProps = {
  children: "[view source on github]",
  className: undefined
};

export default withStyles(styles)(ViewSourceLink);
