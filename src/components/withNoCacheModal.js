import React, { Fragment, forwardRef, Component } from "react";
import PropTypes from "prop-types";
import hoistNonReactStatics from "hoist-non-react-statics";

import Modal from "@material-ui/core/Modal";

const withNoCacheModal = Comp => {
  class Wrapper extends Component {
    state = {
      open: false
    };

    handleOpen = () => {
      this.setState({ open: true });
    };

    handleClose = () => {
      this.setState({ open: false });
    };

    render() {
      return (
        <Fragment>
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.open}
            onClose={this.handleClose}
          >
            <div>Hello</div>
          </Modal>
          <Comp ref={this.props.innerRef} />
        </Fragment>
      );
    }
  }
  Wrapper.displayName = `withNoCacheModal(${Comp.displayName ||
    Comp.name ||
    "Component"})`;
  const WrapperWithRef = forwardRef((props, ref) => (
    <Wrapper innerRef={ref} {...props} openNoCacheModal={this.handleOpen} />
  ));
  hoistNonReactStatics(WrapperWithRef, Comp);
  WrapperWithRef.WrappedComponent = Comp;
  Wrapper.propTypes = {
    innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  };
  Wrapper.defaultProps = {
    innerRef: undefined
  };
  return WrapperWithRef;
};

export default withNoCacheModal;
