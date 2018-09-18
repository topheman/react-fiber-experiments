import React, { Component, Fragment } from "react";
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
    },
    "& li a.loading": {
      opacity: 0.5
    }
  },
  emojiFinger: {
    display: "block",
    float: "left",
    fontSize: "3rem"
  }
};

class CoursesList extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    style: PropTypes.object
  };
  static defaultProps = {
    className: undefined,
    style: undefined
  };
  state = {
    currentLink: null
  };
  render() {
    const { classes, className, ...remainingProps } = this.props;
    return (
      <Fragment>
        <span
          role="img"
          aria-label="finger right"
          className={classes.emojiFinger}
        >
          👉
        </span>
        <ul className={classNames(classes.root, className)} {...remainingProps}>
          {courseList.map(course => {
            const isLoadingLink =
              this.state.currentLink &&
              this.state.currentLink.endsWith(course.id);
            return (
              <li key={course.id}>
                <Link
                  to={`course/${course.id}`}
                  onClick={event => {
                    this.setState({
                      currentLink: event.target.href
                    });
                  }}
                  className={isLoadingLink ? "loading" : null}
                >
                  {course.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </Fragment>
    );
  }
}

export default withStyles(styles)(CoursesList);
