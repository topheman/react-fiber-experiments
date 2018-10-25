import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";

import { fakeApi } from "../libs/fake-api";

import CourseInfos from "../components/CourseInfos";
import NextLessonDisplay from "../components/NextLessonDisplay";
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
  componentDidUpdate(prevProps) {
    if (prevProps.courseId !== this.props.courseId) {
      console.log("didUpdate");
      this.loadCourseInfos(this.props.courseId);
      this.loadNextLesson(this.props.courseId);
    }
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
              data-testid="course-infos"
              data={courseData}
              reload={() => {
                this.loadCourseInfos(courseId);
                this.loadNextLesson(courseId);
              }}
            />
            {lessonData && (
              <NextLessonDisplay data-testid="next-lesson" data={lessonData} />
            )}
            {!lessonData &&
              !lessonError && <Spinner data-testid="next-lesson-spinner" />}
            {lessonError && (
              <ErrorRetry
                data-testid="next-lesson-error"
                which="next lesson"
                retryCallback={() => this.loadNextLesson(courseId)}
              />
            )}
          </Fragment>
        )}
        {!courseData &&
          !courseError && <Spinner data-testid="course-infos-spinner" />}
        {courseError && (
          <ErrorRetry
            data-testid="course-infos-error"
            which="course"
            retryCallback={() => this.loadCourseInfos(courseId)}
          />
        )}
        <div>
          <Link
            to={`../../../async-rendering/delayMs/DEFAULT_DELAY_MS/course/${courseId}`}
            onClick={() =>
              alert(
                "No more cache invalidation - https://github.com/facebook/react/pull/13865"
              )
            }
          >
            Compare to async rendering
          </Link>{" "}
          (experimental APIs) - will reset suspense cache
        </div>
      </Fragment>
    );
  }
}

export default RegularCoursesContainer;
