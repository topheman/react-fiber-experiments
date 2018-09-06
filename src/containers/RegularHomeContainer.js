import React from "react";
import { Link } from "@reach/router";

/**
 * This component is mounted as the default subroute of `/regular`
 */
const RegularHomeContainer = () => (
  <div>
    <p>We will be loading infos from the api and rendering it.</p>
    <p>Those infos will be accessible by changing the url:</p>
    <ul>
      <li>
        <Link to="course/1">course/1</Link>
      </li>
      <li>
        <Link to="course/2">course/2</Link>
      </li>
    </ul>
  </div>
);

export default RegularHomeContainer;
