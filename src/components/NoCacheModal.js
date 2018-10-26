import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import classNames from "classnames";

const top = 50;
const left = 50;

const styles = theme => ({
  content: {
    position: "absolute",
    width: "80vw",
    maxWidth: "550px",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: "0px 15px"
  },
  position: {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  },
  buttonWrapper: {
    textAlign: "center"
  },
  button: {
    margin: "5px 20px"
  }
});

const NoCacheModal = ({
  classes,
  className,
  onClose,
  reload,
  ...remainingProps
}) => (
  <Modal
    aria-labelledby="simple-modal-title"
    aria-describedby="simple-modal-description"
    onClose={onClose}
    {...remainingProps}
  >
    <div className={classNames(classes.content, classes.position)}>
      <p>
        Since react@16.6.0, no more cache invalidation - see{" "}
        <a href="https://github.com/facebook/react/pull/13865">PR#13865</a>.
      </p>
      <p>
        It will get back in a next version (relying on{" "}
        <code>Context.write</code>
        ).
      </p>
      <p>
        So, temporarily unavailable, reloading the page will kill the cache.
      </p>
      <p className={classes.buttonWrapper}>
        {reload && (
          <Button
            variant="contained"
            className={classes.button}
            onClick={reload}
          >
            Reload
          </Button>
        )}
        <Button
          variant="contained"
          className={classes.button}
          onClick={onClose}
        >
          Close
        </Button>
      </p>
    </div>
  </Modal>
);

NoCacheModal.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  reload: PropTypes.func
};
NoCacheModal.defaultProps = {
  className: undefined,
  reload: undefined
};

export default withStyles(styles)(NoCacheModal);
