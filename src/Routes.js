import React, { lazy, Placeholder } from "react";
import { Router, Redirect } from "@reach/router";
import loadable from "loadable-components";
import PropTypes from "prop-types";

import { getNetworkDelay } from "./libs/fake-api";

import MainLayout from "./components/MainLayout";
import Spinner from "./components/Spinner";

// Containers that will be loaded by the router
import HomeContainer, { SuspenseExplanation } from "./containers/HomeContainer";
import AboutContainer from "./containers/AboutContainer";
import QrcodeContainer from "./containers/QrcodeContainer";
import RegularContainer from "./containers/RegularContainer";
import RegularHomeContainer from "./containers/RegularHomeContainer";
import SuspenseContainer from "./containers/SuspenseContainer";
import SuspenseHomeContainer from "./containers/SuspenseHomeContainer";
import AsyncRenderingBasisContainer, {
  DelayContainer
} from "./containers/AsyncRenderingBasisContainer";

// regular Lazy load, throttling with a specific delay
const RegularCoursesContainer = loadable(
  () =>
    import("./containers/RegularCoursesContainer").then(script => {
      const delay = getNetworkDelay("/scripts/course-container");
      return new Promise(resolve => setTimeout(() => resolve(script), delay));
    }),
  { LoadingComponent: () => <Spinner style={{ color: "blue" }} size={75} /> }
);

/**
 * suspense Lazy load, throttling with a specific delay - https://github.com/facebook/react/blob/master/packages/react/src/ReactLazy.js
 *
 * Without all the delay customizing, this would be:
 *
 * const Container = React.lazy(() => import("./containers/SuspenseCoursesContainer"))
 */
const SuspenseCourseContainerPromise = lazy(() =>
  import("./containers/SuspenseCoursesContainer").then(
    SuspenseCoursesContainerLoaded => {
      const delay = getNetworkDelay("/scripts/course-container");
      return new Promise(resolve =>
        setTimeout(() => resolve(SuspenseCoursesContainerLoaded), delay)
      );
    }
  )
);
const LazySuspenseCoursesContainer = props => (
  <Placeholder
    delayMs={parseInt(props.delayMs, 10)}
    fallback={<Spinner style={{ color: "blue" }} size={75} />}
  >
    <SuspenseCourseContainerPromise {...props} />
  </Placeholder>
);
LazySuspenseCoursesContainer.propTypes = {
  delayMs: PropTypes.string
};
LazySuspenseCoursesContainer.defaultProps = {
  delayMs: undefined
};

/**
 * <MainLayout> is not wrapped by the Router
 * -> no need for withRouter() on the direct descendante
 * -> no withRouter() in @reach/router
 */
const Routes = () => (
  <MainLayout>
    <Router>
      <Redirect
        from="/suspense/async-rendering"
        to="/suspense/async-rendering/delayMs/350"
        noThrow
      />
      <Redirect
        from="/suspense/async-rendering/delayMs/DEFAULT_DELAY_MS/course/:courseId"
        to="/suspense/async-rendering/delayMs/350/course/:courseId"
        noThrow
      />
      <Redirect
        from="/suspense/placeholder"
        to="/suspense/placeholder/delayMs/350"
        noThrow
      />
      <HomeContainer path="/" />
      <AboutContainer path="/about" />
      <QrcodeContainer path="/qrcode" />
      <SuspenseExplanation path="suspense" header />
      <RegularContainer path="suspense/regular-rendering">
        <RegularHomeContainer path="/" />
        <RegularCoursesContainer path="/course/:courseId" />
      </RegularContainer>
      <SuspenseContainer path="suspense/async-rendering/delayMs/:delayMs">
        <SuspenseHomeContainer path="/" />
        <LazySuspenseCoursesContainer path="/course/:courseId" />
      </SuspenseContainer>
      <AsyncRenderingBasisContainer path="suspense/placeholder/delayMs/:delayMs">
        <DelayContainer path="/duration/:duration" />
      </AsyncRenderingBasisContainer>
    </Router>
  </MainLayout>
);

export default Routes;
