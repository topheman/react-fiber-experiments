import React, { Placeholder } from "react";
import PropTypes from "prop-types";
import { Link, navigate } from "@reach/router";
import { createResource } from "simple-cache-provider"; // eslint-disable-line
import { Slider } from "@material-ui/lab";

import { cache } from "../cache";
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
      Async Rendering Basis
      <ViewSourceLink filename="src/containers/AsyncRenderingBasisContainer.js" />
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
      data-testid="placeholder-slider"
      min={0}
      max={10000}
      step={100}
      value={parseInt(delayMs, 10)}
      onChange={(event, value) =>
        navigate(`/suspense/placeholder/delayMs/${value}`)
      }
    />
    <pre data-testid="placeholder-preview">{`<Placeholder delayMs={${delayMs}} fallback={<Spinner />}>`}</pre>
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
