import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import { Link } from "@reach/router";

const styles = {
  root: {},
  backLink: {
    textDecoration: "none",
    background: "none",
    marginRight: 5
  }
};

const CourseInfos = ({
  data,
  reload,
  classes,
  className,
  ...remainingProps
}) => (
  <div className={classNames(classes.root, className)} {...remainingProps}>
    <h2>
      <Link
        to="../.."
        className={classes.backLink}
        title="Back"
        data-testid="back-button"
      >
        <span role="img" aria-label="previous">
          ⬅️
        </span>
      </Link>
      {reload ? (
        <span
          onClick={reload}
          role="button"
          tabIndex={0}
          onKeyDown={() => {}}
          data-testid="reload-button"
        >
          <span role="img" aria-label="reload" style={{ cursor: "pointer" }}>
            🔄
          </span>
        </span>
      ) : (
        <span role="img" aria-label="course">
          📖
        </span>
      )}{" "}
      {data.name}
    </h2>
    <ul>
      {data.lessons &&
        data.lessons.map(lesson => <li key={lesson}>{lesson}</li>)}
    </ul>
  </div>
);

CourseInfos.propTypes = {
  data: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  reload: PropTypes.func
};

CourseInfos.defaultProps = {
  className: undefined,
  style: undefined,
  reload: undefined
};

export default withStyles(styles)(CourseInfos);
