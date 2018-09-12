import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import { withStyles } from "@material-ui/core/styles";

import qrcode from "../assets/images/qrcode.png";

const styles = {
  qrCodeWrapper: {
    margin: "0px auto",
    width: 250,
    height: 250,
    backgroundImage: `url(${qrcode})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100%"
  }
};

const QrcodeContainer = ({ classes }) => (
  <Fragment>
    <p>
      <Link to="/">
        <span role="img" aria-label="home">
          🏠 Home
        </span>
      </Link>
      {" > "}
      <strong>Qrcode</strong>
    </p>
    <div
      className={classes.qrCodeWrapper}
      role="img"
      aria-label="Qrcode to access to https://react-fiber-experiments.surge.sh"
      title="Snap the qrcode to access the website"
      data-testid="qrcode-standalone"
    />
    <p style={{ textAlign: "center" }}>
      <a
        href="https://react-fiber-experiments.surge.sh"
        title="Share this website!"
      >
        https://react-fiber-experiments.surge.sh
      </a>
    </p>
  </Fragment>
);
QrcodeContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(QrcodeContainer);
