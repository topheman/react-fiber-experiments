import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";

import courseList from "../libs/fake-api/fixtures.json";

const styles = {
  root: {
    listStyle: "none",
    paddingLeft: 0,
    "& li": {
      display: "inline-block"
    },
    "& li a": {
      display: "inline-block",
      width: 150,
      height: 50,
      background: "#DDDDDD",
      border: "1px solid #CCCCCC",
      margin: "5px 10px",
      borderRadius: 5,
      textAlign: "center",
      lineHeight: "50px"
    }
  },
  emojiFinger: {
    display: "block",
    float: "left",
    fontSize: "3rem"
  }
};

const CoursesList = ({ classes, className, ...remainingProps }) => (
  <Fragment>
    <span role="img" aria-label="finger right" className={classes.emojiFinger}>
      👉
    </span>
    <ul className={classNames(classes.root, className)} {...remainingProps}>
      {courseList.map(course => (
        <li key={course.id}>
          <Link to={`course/${course.id}`}>{course.name}</Link>
        </li>
      ))}
    </ul>
  </Fragment>
);

CoursesList.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  style: PropTypes.object
};

CoursesList.defaultProps = {
  className: undefined,
  style: undefined
};

export default withStyles(styles)(CoursesList);
