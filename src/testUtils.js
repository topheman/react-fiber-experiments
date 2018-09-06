// inpired by https://github.com/kentcdodds/testing-workshop/blob/master/client/test/til-client-test-utils.js

import React from "react";
import {
  LocationProvider,
  createMemorySource,
  createHistory
} from "@reach/router";
import { render } from "react-testing-library"; // eslint-disable-line

const renderWithRouter = (ui, renderOptions = {}, { pathname = "/" } = {}) => {
  const history = createHistory(createMemorySource(pathname));
  return render(
    <LocationProvider history={history}>{ui}</LocationProvider>,
    renderOptions
  );
};

export {
  Simulate,
  wait,
  render,
  cleanup,
  renderIntoDocument,
  fireEvent
} from "react-testing-library";
export { renderWithRouter };
