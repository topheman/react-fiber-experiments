import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const Spinner = ({ ...props }) => (
  <CircularProgress size={50} color="primary" {...props} />
);

export default Spinner;
