import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";

import NetworkSlider from "../components/NetworkSlider";
import { cache } from "../cache";
import { getNetworkDelay } from "../libs/fake-api";
import ViewSourceLink from "../components/ViewSourceLink";

/**
 * This component is mounted by the router at `/regular`
 * It wrapps children described with `path` prop so they respond to router changes
 * In the header: a relative link! To go back to this component
 */
const SuspenseContainer = ({ children, delayMs, location }) => {
  const waitingMode = parseInt(delayMs, 10) >= 10000;
  const REGEXP_MATCH = /\/course(\/.*)?/;
  // const baseUrl = location.pathname.replace(REGEXP_MATCH, "");
  let relativeUrl = location.pathname.match(REGEXP_MATCH);
  if (relativeUrl) {
    [relativeUrl] = relativeUrl;
  }
  return (
    <div>
      <p>
        <Link to="/">
          <span role="img" aria-label="home">
            🏠 Home
          </span>
        </Link>
        {" > "}
        <Link to="../../..">Suspense</Link>
        {" > "}
        {waitingMode ? (
          <Link to="./">
            <strong>Waiting Mode</strong>
          </Link>
        ) : (
          <Fragment>
            <Link to="./">
              <strong>Async</strong> rendering
            </Link>{" "}
            (experimental APIs)
            {relativeUrl && (
              <ViewSourceLink filename="src/containers/SuspenseCoursesContainer.js" />
            )}
          </Fragment>
        )}
      </p>
      <h2>{waitingMode ? "Waiting Mode" : "Async rendering"}</h2>
      <NetworkSlider
        render={({ networkMode }) => {
          const explainResetCache = (
            <p>
              <span
                onClick={() => cache.invalidate()}
                role="button"
                tabIndex={0}
                onKeyDown={() => {}}
                style={{ cursor: "pointer" }}
              >
                <span role="img" aria-label="reset cache">
                  🔄
                </span>
                <strong>Reset cache</strong> (invalidate cache from{" "}
                <code>simple-cache-provider</code>)
              </span>
            </p>
          );
          if (relativeUrl) {
            const explanations = {
              slowNetwork: (
                <Fragment>
                  <p>
                    On a low connexion, we still have one spinner (and
                    eventually a{" "}
                    <span style={{ color: "blue" }}>blue spinner</span> if this
                    is first load, due to chunk lazy loading)
                  </p>
                </Fragment>
              ),
              fastNetwork: (
                <Fragment>
                  <p>
                    On a fast network, <strong>no more spinner showing</strong>.
                  </p>
                  <p>
                    <strong>Render pauses</strong> until request for data
                    resolve.
                    <br />
                    Since <strong>@reach/router is suspense aware</strong>,
                    transition to next route is placed on hold for{" "}
                    <code>
                      &lt;Placeholder{" "}
                      <strong>
                        delayMs=
                        {"{"}
                        {getNetworkDelay("/courses/topic")}
                        {"}"}
                      </strong>
                      &gt;
                    </code>
                    .
                  </p>
                </Fragment>
              ),
              slowEndPoint: (
                <Fragment>
                  <p>
                    On a slow endpoint we only have <strong>one spinner</strong>
                    :
                  </p>
                  <ul>
                    <li>
                      First Spinner for lessons list{" "}
                      <strong>
                        doesn&apos;t show because request is fast enough
                      </strong>{" "}
                      (same scenario as &quot;fastNetwork&quot;)
                    </li>
                    <li>
                      Render is paused until showing the spinner for the loading
                      of the current lesson
                    </li>
                  </ul>
                </Fragment>
              )
            };
            return (
              <Fragment>
                {explainResetCache}
                {waitingMode ? null : explanations[networkMode]}
              </Fragment>
            );
          }
          return explainResetCache;
        }}
      />
      {children}
    </div>
  );
};
SuspenseContainer.propTypes = {
  // can't put .isRequired - Router seems to not only clone but also render Router children
  // which leeds to propTypes validation before the componenent is mounted on route match
  // https://github.com/reach/router/blob/master/src/index.js#L223-L226
  location: PropTypes.object, // from the Router
  children: PropTypes.node.isRequired,
  delayMs: PropTypes.string
};
SuspenseContainer.defaultProps = {
  location: undefined,
  delayMs: undefined
};

export default SuspenseContainer;
