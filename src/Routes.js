import React from "react";
import { Router } from "@reach/router";
import Loadable from "react-loadable";

import MainLayout from "./components/MainLayout";

// Containers that will be loaded by the router
import HomeContainer from "./containers/HomeContainer";
import RegularContainer from "./containers/RegularContainer";
import RegularHomeContainer from "./containers/RegularHomeContainer";

// Lazy load - with specific delay
const RegularCoursesContainer = Loadable({
  loader: () =>
    import("./containers/RegularCoursesContainer").then(script => {
      const delay = 0; // todo retrieve from LocalStorage
      return new Promise(resolve => setTimeout(() => resolve(script), delay));
    }),
  loading: () => <div>loading ...</div>
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
