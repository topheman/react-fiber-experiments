import React, { Suspense } from "react";
import PropTypes from "prop-types";
import { Link, navigate } from "@reach/router";
import { unstable_createResource as createResource } from "react-cache"; // eslint-disable-line
import { Slider } from "@material-ui/lab";

import Spinner from "../components/Spinner";
import DurationList from "../components/DurationList";
import ViewSourceLink from "../components/ViewSourceLink";

/**
 * Basic resource that will execute a promise that will resolve after `duration` ms
 */
const ThrottledResource = createResource(
  duration =>
    new Promise(resolve => {
      setTimeout(
        () => resolve(`Resource loaded in ${duration}ms`),
        parseInt(duration, 10)
      );
    })
);

const Delay = ({ duration }) => {
  const data = ThrottledResource.read(duration);
  return <p data-testid="delay-result">{data}</p>;
};
Delay.propTypes = {
  duration: PropTypes.string.isRequired
};

export const DelayContainer = ({ delayMs, ...remainingProps }) => (
  <Suspense
    maxDuration={parseInt(delayMs, 10)}
    fallback={<Spinner data-testid="delay-spinner" />}
  >
    <Delay maxDuration={delayMs} {...remainingProps} />
  </Suspense>
);
DelayContainer.propTypes = {
  delayMs: PropTypes.string
};
DelayContainer.defaultProps = {
  delayMs: "400"
};

const AsyncRenderingBasisContainer = ({ children, delayMs }) => (
  <div>
    <p>
      <Link to="/">
        <span role="img" aria-label="home">
          🏠️ Home
        </span>
      </Link>
      {" > "}
      <Link to="../../..">Suspense</Link>
      {" > "}
      Async Rendering Basis
      <ViewSourceLink filename="src/containers/AsyncRenderingBasisContainer.js" />
    </p>
    <h2>Async Rendering Basis</h2>
    <p>
      To understand the basics of <strong>render pausing</strong> with reading
      from cache and Suspense delayMs / fallback attributes:
    </p>
    <ul>
      <li>
        Launch different renders encapsulating request with different durations
      </li>
      <li>Apply different delayMs with the slider:</li>
    </ul>
    <Slider
      data-testid="placeholder-slider"
      min={0}
      max={10000}
      step={100}
      value={parseInt(delayMs, 10)}
      onChange={(event, value) =>
        navigate(`/suspense/placeholder/delayMs/${value}`)
      }
    />
    <pre data-testid="placeholder-preview">{`<Suspense maxDuration={${delayMs}} fallback={<Spinner />}>`}</pre>
    <p>
      <span
        data-testid="cache-refresh-button"
        onClick={() =>
          alert(
            "No more cache invalidation - https://github.com/facebook/react/pull/13865"
          )
        }
        role="button"
        tabIndex={0}
        onKeyDown={() => {}}
        style={{ cursor: "pointer" }}
      >
        <span role="img" aria-label="reset cache">
          🔄
        </span>{" "}
        Reset cache
      </span>
    </p>
    {children}
    <DurationList />
  </div>
);
AsyncRenderingBasisContainer.propTypes = {
  children: PropTypes.node.isRequired,
  delayMs: PropTypes.string
};
AsyncRenderingBasisContainer.defaultProps = {
  delayMs: undefined
};

export default AsyncRenderingBasisContainer;
