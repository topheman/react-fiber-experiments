import React, { Fragment } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import Header from "../components/Header";
import Footer from "../components/Footer";

const styles = theme => ({
  root: {
    margin: "80px 16px 0px"
  },
  content: {
    margin: "0px auto",
    [theme.breakpoints.up("xs")]: {
      maxWidth: "1180px" // adjust for regular and small screens (default fixed maxWidth)
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: "90vw" // adjust for wide screens
    },
    [theme.breakpoints.up("xl")]: {
      maxWidth: "70vw" // adjust for very-wide screens
    }
  }
});

const MainLayout = ({ children, classes }) => (
  <Fragment>
    <CssBaseline />
    <div className={classes.root}>
      <Header />
      <div className={classes.content} data-section="content">
        {children}
      </div>
      <Footer fromFullYear={2018} data-section="footer" />
    </div>
  </Fragment>
);

MainLayout.propTypes = {
  children: PropTypes.element.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MainLayout);
