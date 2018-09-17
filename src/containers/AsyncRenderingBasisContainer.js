import React, { Placeholder } from "react";
import PropTypes from "prop-types";
import { Link, navigate } from "@reach/router";
import { createResource } from "simple-cache-provider"; // eslint-disable-line
import { Slider } from "@material-ui/lab";

import { cache } from "../cache";
import Spinner from "../components/Spinner";

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
  const data = ThrottledResource.read(cache, duration);
  return <p>{data}</p>;
};
Delay.propTypes = {
  duration: PropTypes.string.isRequired
};

export const DelayContainer = ({ delayMs, ...remainingProps }) => (
  <Placeholder delayMs={parseInt(delayMs, 10)} fallback={<Spinner />}>
    <Delay delayMs={delayMs} {...remainingProps} />
  </Placeholder>
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
      Async Rendering Basis{" "}
      <a
        href="https://github.com/topheman/react-fiber-experiments/tree/master/src/containers/AsyncRenderingBasisContainer.js"
        rel="noopener noreferrer"
        target="_blank"
      >
        [view source on github]
      </a>
    </p>
    <h2>Async Rendering Basis</h2>
    <p>
      To understand the basics of <strong>render pausing</strong> with reading
      from cache and Placeholder delayMs / fallback attributes:
    </p>
    <ul>
      <li>
        Launch different renders encapsulating request with different durations
      </li>
      <li>Apply different delayMs with the slider:</li>
    </ul>
    <Slider
      min={0}
      max={10000}
      step={100}
      value={parseInt(delayMs, 10)}
      onChange={(event, value) => navigate(`/suspense/simple/delayMs/${value}`)}
    />
    <pre>{`<Placeholder delayMs={${delayMs}} fallback={<Spinner />}>`}</pre>
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
        </span>{" "}
        Reset cache
      </span>
    </p>
    <ul>
      {[150, 300, 1000, 2000, 3000, 5000, 6000, 10000].map(duration => (
        <li key={duration}>
          <Link to={`./duration/${duration}`}>{duration}</Link>
        </li>
      ))}
    </ul>
    {children}
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
