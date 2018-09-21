import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";

const styles = {
  root: {
    listStyle: "none",
    paddingLeft: 0,
    "& li": {
      display: "inline-block"
    },
    "& li a .render-finished": {
      pointerEvents: "none"
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
      lineHeight: "50px",
      "& .render-paused": {
        display: "none"
      },
      "& .render-finished": {
        display: "inline-block"
      }
    },
    "& li a.loading": {
      opacity: 0.5,
      "& .render-paused": {
        display: "inline-block"
      },
      "& .render-finished": {
        display: "none"
      }
    },
    "& li a.active": {
      fontWeight: "bold",
      textDecoration: "none",
      "& .render-paused": {
        display: "none"
      },
      "& .render-finished": {
        display: "inline-block"
      }
    }
  },
  emojiFinger: {
    display: "block",
    float: "left",
    fontSize: "3rem"
  }
};

const isActive = ({ isCurrent }) =>
  isCurrent ? { className: "active" } : null;

class DurationList extends Component {
  static propTypes = {
    durations: PropTypes.arrayOf(PropTypes.number),
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    style: PropTypes.object
  };
  static defaultProps = {
    durations: [
      150,
      300,
      1000,
      2000,
      3000,
      5000,
      6000,
      10000,
      3010,
      3020,
      3030,
      3040
    ],
    className: undefined,
    style: undefined
  };
  state = {
    currentLink: null
  };
  render() {
    const { classes, className, durations, ...remainingProps } = this.props;
    return (
      <Fragment>
        <ul className={classNames(classes.root, className)} {...remainingProps}>
          {durations.map(duration => {
            const isLoadingLink =
              this.state.currentLink &&
              this.state.currentLink.endsWith(duration);
            return (
              <li key={duration}>
                <Link
                  to={`./duration/${duration}`}
                  onClick={event => {
                    this.setState({
                      currentLink: event.target.href
                    });
                  }}
                  className={isLoadingLink ? "loading" : null}
                  getProps={isActive}
                >
                  <span className="render-finished">{duration}</span>
                  <span className="render-paused">Suspend</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Fragment>
    );
  }
}

export default withStyles(styles)(DurationList);
