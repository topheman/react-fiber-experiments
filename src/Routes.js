import React from "react";
import { Router } from "@reach/router";
import loadable from "loadable-components";

import { getNetworkDelay } from "./libs/fake-api";

import MainLayout from "./components/MainLayout";
import Spinner from "./components/Spinner";

// Containers that will be loaded by the router
import HomeContainer, { SuspenseExplanation } from "./containers/HomeContainer";
import RegularContainer from "./containers/RegularContainer";
import RegularHomeContainer from "./containers/RegularHomeContainer";
import SuspenseContainer from "./containers/SuspenseContainer";
import SuspenseHomeContainer from "./containers/SuspenseHomeContainer";
import SuspenseCoursesContainer from "./containers/SuspenseCoursesContainer";

// regular Lazy load, throttling with a specific delay
const RegularCoursesContainer = loadable(
  () =>
    import("./containers/RegularCoursesContainer").then(script => {
      const delay = getNetworkDelay("/scripts/course-container");
      return new Promise(resolve => setTimeout(() => resolve(script), delay));
    }),
  { LoadingComponent: () => <Spinner style={{ color: "blue" }} size={75} /> }
);

// suspense Lazy load, throttling with a specific delay

/**
 * <MainLayout> is not wrapped by the Router
 * -> no need for withRouter() on the direct descendante
 * -> no withRouter() in @reach/router
 */
const Routes = () => (
  <MainLayout>
    <Router>
      <HomeContainer path="/" />
      <SuspenseExplanation path="suspense" header />
      <RegularContainer path="suspense/regular-rendering">
        <RegularHomeContainer path="/" />
        <RegularCoursesContainer path="/course/:courseId" />
      </RegularContainer>
      <SuspenseContainer path="suspense/async-rendering">
        <SuspenseHomeContainer path="/" />
        <LazySuspenseCoursesContainer path="/course/:courseId" />
      </SuspenseContainer>
    </Router>
  </MainLayout>
);

export default Routes;
