import { Component } from "react";
import PropTypes from "prop-types";

class ErrorBoundary extends Component {
  static propTypes = {
    renderError: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
  };
  state = { hasError: false };
  componentDidCatch(error, info) {
    console.log("CATCH", error, info);
    this.setState({ hasError: true });
  }
  resetError() {
    console.log("reset error");
    this.setState({ hasError: false });
  }
  render() {
    const { renderError, children } = this.props;
    if (this.state.hasError) {
      return renderError({ resetError: this.resetError });
    }
    return children;
  }
}

export default ErrorBoundary;
