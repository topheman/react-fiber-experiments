import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import { fakeApi } from "../libs/fake-api";

import CourseInfos from "../components/CourseInfos";
import NextLesson from "../components/NextLesson";
import ErrorRetry from "../components/ErrorRetry";
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
  componentWillUnmount() {
    this.isCancelled = true;
  }
  isCancelled = false;
  loadCourseInfos(courseId) {
    this.setState({
      courseData: null,
      courseError: null
    });
    fakeApi(`/course/${courseId}`)
      .then(courseData => {
        if (!this.isCancelled) {
          this.setState({
            courseData,
            courseError: null
          });
        }
      })
      .catch(courseError => {
        if (!this.isCancelled) {
          this.setState({
            courseData: null,
            courseError
          });
        }
      });
  }
  loadNextLesson(courseId) {
    this.setState({
      lessonData: null,
      lessonError: null
    });
    fakeApi(`/course/${courseId}/nextLesson`)
      .then(lessonData => {
        if (!this.isCancelled) {
          this.setState({
            lessonData,
            lessonError: null
          });
        }
      })
      .catch(lessonError => {
        if (!this.isCancelled) {
          this.setState({
            lessonData: null,
            lessonError
          });
        }
      });
  }
  render() {
    const { courseId } = this.props;
    const { courseData, courseError, lessonData, lessonError } = this.state;
    return (
      <Fragment>
        {courseData && (
          <Fragment>
            <CourseInfos
              data={courseData}
              reload={() => {
                this.loadCourseInfos(courseId);
                this.loadNextLesson(courseId);
              }}
            />
            {lessonData && <NextLesson data={lessonData} />}
            {!lessonData && !lessonError && <Spinner />}
            {lessonError && (
              <ErrorRetry
                which="next lesson"
                retryCallback={() => this.loadNextLesson(courseId)}
              />
            )}
          </Fragment>
        )}
        {!courseData && !courseError && <Spinner />}
        {courseError && (
          <ErrorRetry
            which="courses"
            retryCallback={() => this.loadCourseInfos(courseId)}
          />
        )}
      </Fragment>
    );
  }
}

export default RegularCoursesContainer;
