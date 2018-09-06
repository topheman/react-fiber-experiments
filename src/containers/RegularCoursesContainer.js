import React, { Component } from "react";
import PropTypes from "prop-types";

class RegularCoursesContainer extends Component {
  static propTypes = {
    // can't put .isRequired - Router seems to not only clone but also render Router children
    // which leeds to propTypes validation before the componenent is mounted on route match
    // https://github.com/reach/router/blob/master/src/index.js#L223-L226
    courseId: PropTypes.string
  };
  static defaultProps = {
    courseId: undefined
  };
  componentDidMount() {}
  render() {
    const { courseId } = this.props;
    console.log({ courseId });
    return (
      <div>
        <p>
          <span role="img" aria-label="home">
            📖
          </span>{" "}
          Loading general courses infos ... Loading specific course{" "}
          <strong>{courseId}</strong> infos ... (comming up)
        </p>
      </div>
    );
  }
}

export default RegularCoursesContainer;
