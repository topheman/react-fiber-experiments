import React from "react";
import PropTypes from "prop-types";

const NextLesson = ({ data, ...remainingProps }) => (
  <p {...remainingProps}>
    Next lesson: <strong>{data}</strong>
  </p>
);

NextLesson.propTypes = {
  data: PropTypes.string.isRequired
};

export default NextLesson;
