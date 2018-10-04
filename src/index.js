import React from "react";
import { unstable_createRoot } from "react-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import { initCache } from "./cache";

import "./index.css";
import RootContainer from "./containers/RootContainer";
import { unregister } from "./registerServiceWorker";

import { initFakeApi } from "./libs/fake-api";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#900000",
      light: "#c8412a"
    },
    secondary: { main: "#DDDDDD" },
    error: {
      main: "#f44336",
      light: "#e5c9ca"
    }
  },
  overrides: {
    MuiListSubheader: {
      root: {
        fontSize: "1rem",
        color: "grey",
        fontWeight: 500
      }
    },
    MuiTypography: {
      subheading: {
        fontSize: "1rem",
        color: "grey",
        fontWeight: 500
      }
    }
  }
});

/**
 * This is where you add the root providers (like react-redux Provider)
 */
const render = Component => {
  unstable_createRoot(document.getElementById("root")).render(
    <MuiThemeProvider theme={theme}>
      <Component />
    </MuiThemeProvider>
  );
};

// You may init any API service here

initCache();
initFakeApi();

render(RootContainer);
unregister();

if (module.hot) {
  module.hot.accept("./containers/RootContainer", () => {
    render(RootContainer);
  });
}
