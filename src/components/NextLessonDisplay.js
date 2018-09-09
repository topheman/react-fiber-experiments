import React from "react";
import PropTypes from "prop-types";

const NextLessonDisplay = ({ data, ...remainingProps }) => (
  <p {...remainingProps}>
    Next lesson: <strong>{data}</strong>
  </p>
);

NextLessonDisplay.propTypes = {
  data: PropTypes.string.isRequired
};

export default NextLessonDisplay;
