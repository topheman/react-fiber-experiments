import React from "react";
import { Link } from "@reach/router";

import courseList from "../libs/fake-api/fixtures.json";

/**
 * This component is mounted as the default subroute of `/regular`
 */
const RegularHomeContainer = () => (
  <div>
    <p>
      This is a fake api returning a list of courses. IRL you may have the
      following use case:
    </p>
    <ul>
      <li>
        Course list is shared by all users (and might benefit from agressive
        caching server side)
      </li>
      <li>
        Current lesson is user specific and might take longer due to auth /
        no-cache ...
      </li>
    </ul>
    <p>
      You may change the network&apos;s behavior with the slider at the top.
    </p>
    <p>
      The lazy loading of the JavaScript chunk is also emulated (this is the
      very first spinner)
    </p>
    <p>
      <strong>
        Test the following links in different modes, then pass to the next
        section.
      </strong>
    </p>
    <ul>
      {courseList.map(course => (
        <li key={course.id}>
          <Link to={`course/${course.id}`}>{course.name}</Link>
        </li>
      ))}
    </ul>
  </div>
);

export default RegularHomeContainer;
