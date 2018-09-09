import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";

const ErrorRetry = ({ retryCallback, which, ...remainingProps }) => (
  <p {...remainingProps}>
    An error occured loading {which}.{" "}
    <Button variant="contained" color="primary" onClick={retryCallback}>
      RETRY
    </Button>
  </p>
);

ErrorRetry.propTypes = {
  retryCallback: PropTypes.func.isRequired,
  which: PropTypes.string.isRequired
};

export default ErrorRetry;
