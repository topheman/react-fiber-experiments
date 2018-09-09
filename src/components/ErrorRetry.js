import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";

const ErrorRetry = ({ retryCallback, which, ...remainingProps }) => (
  <p {...remainingProps}>
    An error occured loading {which}.{" "}
    {retryCallback ? (
      <Button variant="contained" color="primary" onClick={retryCallback}>
        RETRY
      </Button>
    ) : null}
  </p>
);

ErrorRetry.propTypes = {
  retryCallback: PropTypes.func.isRequired,
  which: PropTypes.string.isRequired
};

export default ErrorRetry;
