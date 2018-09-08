import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";

import { fakeApi } from "../libs/fake-api";

import CourseInfos from "../components/CourseInfos";
import Spinner from "../components/Spinner";

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
  state = {
    courseData: null,
    courseError: null,
    lessonData: null,
    lessonError: null
  };
  componentDidMount() {
    const { courseId } = this.props;
    this.loadCourseInfos(courseId);
    this.loadNextLesson(courseId);
  }
  loadCourseInfos(courseId) {
    this.setState({
      courseData: null,
      courseError: null
    });
    fakeApi(`/course/${courseId}`)
      .then(courseData => {
        this.setState({
          courseData,
          courseError: null
        });
      })
      .catch(courseError => {
        this.setState({
          courseData: null,
          courseError
        });
      });
  }
  loadNextLesson(courseId) {
    this.setState({
      lessonData: null,
      lessonError: null
    });
    fakeApi(`/course/${courseId}/nextLesson`)
      .then(lessonData => {
        this.setState({
          lessonData,
          lessonError: null
        });
      })
      .catch(lessonError => {
        this.setState({
          lessonData: null,
          lessonError
        });
      });
  }
  render() {
    const { courseId } = this.props;
    const { courseData, courseError, lessonData, lessonError } = this.state;
    return (
      <Fragment>
        {courseData && (
          <CourseInfos
            data={courseData}
            reload={() => {
              this.loadCourseInfos(courseId);
              this.loadNextLesson(courseId);
            }}
          />
        )}
        {!courseData && !courseError && <Spinner />}
        {courseError && (
          <p>
            An error occured loading courses.{" "}
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.loadCourseInfos(courseId)}
            >
              RETRY
            </Button>
          </p>
        )}
        {lessonData && <p>Next lesson: {lessonData}</p>}
        {!lessonData && !lessonError && <Spinner />}
        {lessonError && (
          <p>
            An error occured loading next lesson.{" "}
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.loadNextLesson(courseId)}
            >
              RETRY
            </Button>
          </p>
        )}
      </Fragment>
    );
  }
}

export default RegularCoursesContainer;
