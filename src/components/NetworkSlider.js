import React from "react";
import PropTypes from "prop-types";
import Slider from "@material-ui/lab/Slider";
import { compose, withStateHandlers } from "recompose";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";

import { NetworkManager } from "../libs/fake-api";

const styles = {
  root: {},
  slider: {
    width: 200,
    float: "left"
  },
  networkStatus: {
    lineHeight: "2rem"
  },
  emojiFinger: {
    display: "block",
    float: "left",
    fontSize: "1.2rem"
  }
};

const NetworkSlider = ({
  sliderValue,
  updateSliderValue,
  classes,
  className,
  render,
  ...remainingProps
}) => (
  <NetworkManager
    render={({ getNetworkMode, setNetworkMode, listNetworkModes }) => {
      const basisNetworkMode = getNetworkMode(); // on mount
      const networkModes = listNetworkModes();
      const currentIndex =
        sliderValue || networkModes.indexOf(basisNetworkMode);
      return (
        <div
          className={classNames(classes.root, className)}
          {...remainingProps}
        >
          <span
            role="img"
            aria-label="finger right"
            className={classes.emojiFinger}
          >
            👉
          </span>
          <Slider
            className={classes.slider}
            min={0}
            max={networkModes.length - 1}
            value={currentIndex}
            step={1}
            onChange={(e, value) => {
              updateSliderValue(value);
              setNetworkMode(networkModes[value]);
            }}
          />
          <div className={classes.networkStatus}>
            Network status: <strong>{networkModes[currentIndex]}</strong>
          </div>
          {render ? render({ networkMode: networkModes[currentIndex] }) : null}
        </div>
      );
    }}
  />
);
NetworkSlider.propTypes = {
  sliderValue: PropTypes.number,
  updateSliderValue: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  render: PropTypes.func
};
NetworkSlider.defaultProps = {
  sliderValue: undefined,
  className: undefined,
  render: undefined
};

export default compose(
  withStateHandlers(
    { sliderValue: null },
    {
      updateSliderValue: () => value => ({ sliderValue: value })
    }
  ),
  withStyles(styles)
)(NetworkSlider);
