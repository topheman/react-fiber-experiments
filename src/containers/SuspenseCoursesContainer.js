import React, { Fragment, Suspense } from "react";
import PropTypes from "prop-types";
import { unstable_createResource as createResource } from "react-cache"; // eslint-disable-line
import { Link } from "@reach/router";

import { fakeApi } from "../libs/fake-api";

import CourseInfos from "../components/CourseInfos";
import NextLessonDisplay from "../components/NextLessonDisplay";
import ErrorRetry from "../components/ErrorRetry";
import Spinner from "../components/Spinner";

/**
 * Note: The delayMs prop you see flowing up to down comes from the router
 * That way, you can specify the delayMs of the Suspenses around the just
 * by changing a little param in the url
 */

/**
 * Network failure handling - I've tried:
 * - ErrorBoundaries: The first error thrown by the api promise is catched but the ones
 * thrown after by react-cache due to cache miss after trying to remount the node
 * finally bring down the app.
 *
 * For the moment, when I createResource, I return a function that swallows its own errors
 * (by returning promise.catch()) and if an error has occured, the resolved object will
 * contain a attribute "error" with a truthy value.
 *
 * This value is then checked at rendering to choose whether to render data or error.
 */
const CourseResource = createResource(courseId =>
  fakeApi(`/course/${courseId}`).catch(error => ({ error }))
);

const NextLessonResource = createResource(courseId =>
  fakeApi(`/course/${courseId}/nextLesson`).catch(error => ({ error }))
);

const Course = ({ courseId, delayMs, ...remainingProps }) => {
  NextLessonResource.preload(courseId); // avoid serial requests
  const courseData = CourseResource.read(courseId);
  return courseData && !courseData.error ? (
    <div {...remainingProps}>
      <CourseInfos data-testid="course-infos" data={courseData} />
      <Suspense
        maxDuration={parseInt(delayMs, 10)}
        fallback={<Spinner data-testid="next-lesson-spinner" />}
      >
        <NextLesson data-testid="next-lesson" courseId={courseId} />
      </Suspense>
      <div>
        <Link to={`../../../../../regular-rendering/course/${courseId}`}>
          Compare to regular rendering
        </Link>{" "}
        (current APIs)
      </div>
    </div>
  ) : (
    <ErrorRetry data-testid="course-infos-error" which="course" />
  );
};
Course.propTypes = {
  courseId: PropTypes.string.isRequired,
  delayMs: PropTypes.string.isRequired
};

const NextLesson = ({ courseId, ...remainingProps }) => {
  const lessonData = NextLessonResource.read(courseId);
  return lessonData && !lessonData.error ? (
    <NextLessonDisplay data={lessonData} {...remainingProps} />
  ) : (
    <ErrorRetry data-testid="next-lesson-error" which="next lesson" />
  );
};
NextLesson.propTypes = {
  courseId: PropTypes.string.isRequired
};

const SuspenseCoursesContainer = ({ courseId, delayMs }) => (
  <Fragment>
    <Suspense
      maxDuration={parseInt(delayMs, 10)}
      fallback={<Spinner data-testid="course-infos-spinner" />}
    >
      <Course courseId={courseId} maxDuration={delayMs} />
    </Suspense>
  </Fragment>
);
SuspenseCoursesContainer.propTypes = {
  courseId: PropTypes.string,
  delayMs: PropTypes.string
};
SuspenseCoursesContainer.defaultProps = {
  courseId: undefined,
  delayMs: undefined
};

export default SuspenseCoursesContainer;
