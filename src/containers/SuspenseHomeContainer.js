import React from "react";
import { Link } from "@reach/router";

import { cache } from "../cache";
import CoursesList from "../components/CoursesList";

/**
 * This component is mounted as the default subroute of `/regular`
 */
const SuspenseHomeContainer = () => (
  <div>
    <p>
      This is the same fake API as in{" "}
      <Link to="/suspense/regular-rendering">the previous example</Link>.
    </p>
    <p>
      By wrapping the components with{" "}
      <code>
        {"<"}
        Placeholder delayMs=
        {"{"}
        350
        {"}"} fallback=
        {"{<"}
        Spinner {"/>}>"}
      </code>
      , we avoid unnecessary spinners.
    </p>
    <p>
      We also rely on in-memory caching (click on the button{" "}
      <span
        onClick={() => cache.invalidate()}
        role="button"
        tabIndex={0}
        onKeyDown={() => {}}
      >
        <span role="img" aria-label="reset cache" style={{ cursor: "pointer" }}>
          🔄
        </span>
      </span>{" "}
      to reset cache, or simply, reload page).
    </p>
    <CoursesList />
  </div>
);

export default SuspenseHomeContainer;
