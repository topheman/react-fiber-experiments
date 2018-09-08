import React, { Component } from "react";
import PropTypes from "prop-types";

import { fakeApi } from "../libs/fake-api/api";

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
  componentDidMount() {
    fakeApi("/courses", "slowNetwork").then(res => console.log(res));
    fakeApi("/course/nodejs", "fastNetwork").then(res => console.log(res));
    fakeApi("/course/docker/nextLesson", "slowEndPoint")
      .then(res => console.log(res))
      .catch(err => console.warn(err));
    fakeApi("/course/notfound", "fastNetwork")
      .then(res => console.log(res))
      .catch(err => console.warn(err));
  }
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
