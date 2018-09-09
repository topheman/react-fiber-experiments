import React from "react";
import { Link } from "@reach/router";

import CoursesList from "../components/CoursesList";

/**
 * This component is mounted as the default subroute of `/regular`
 */
const RegularHomeContainer = () => (
  <div>
    <p>
      Data comes from a fake api returning a list of courses. IRL you may have
      the following use case:
    </p>
    <ul>
      <li>
        Course list is shared by all users (and might benefit from agressive
        caching server side)
      </li>
      <li>
        Current lesson is user specific and might take longer due to auth /
        no-cache / slow query ...
      </li>
    </ul>
    <p>
      You may{" "}
      <strong>
        change the network&apos;s behavior with the slider at the top
      </strong>{" "}
      and choose one of the fake topics:
    </p>
    <CoursesList />
    <p>
      Then <Link to="/suspense/async-rendering">pass to the next section</Link>{" "}
      (async rendering) .
    </p>
  </div>
);

export default RegularHomeContainer;
