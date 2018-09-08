import React, { Fragment } from "react";
import PropTypes from "prop-types";

import { getNetworkMode, setNetworkMode, listNetworkModes } from "./api";

const NetworkManager = ({ render }) => (
  <Fragment>
    {render({
      getNetworkMode,
      setNetworkMode,
      listNetworkModes
    })}
  </Fragment>
);
NetworkManager.propTypes = {
  render: PropTypes.func.isRequired
};

export default NetworkManager;
