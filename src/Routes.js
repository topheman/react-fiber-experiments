import React from "react";
import { Router } from "@reach/router";
import Loadable from "react-loadable";

import { getNetworkDelay } from "./libs/fake-api";

import MainLayout from "./components/MainLayout";
import Spinner from "./components/Spinner";

// Containers that will be loaded by the router
import HomeContainer from "./containers/HomeContainer";
import RegularContainer from "./containers/RegularContainer";
import RegularHomeContainer from "./containers/RegularHomeContainer";

// Lazy load - with specific delay
const RegularCoursesContainer = Loadable({
  loader: () =>
    import("./containers/RegularCoursesContainer").then(script => {
      const delay = getNetworkDelay("/scripts/course-container");
      return new Promise(resolve => setTimeout(() => resolve(script), delay));
    }),
  loading: () => <Spinner style={{ color: "blue" }} size={75} />
});

/**
 * <MainLayout> is not wrapped by the Router
 * -> no need for withRouter() on the direct descendante
 * -> no withRouter() in @reach/router
 */
const Routes = () => (
  <MainLayout>
    <Router>
      <HomeContainer path="/" />
      <RegularContainer path="regular">
        <RegularHomeContainer path="/" />
        <RegularCoursesContainer path="/course/:courseId" />
      </RegularContainer>
    </Router>
  </MainLayout>
);

export default Routes;
