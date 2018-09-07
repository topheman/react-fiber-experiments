import React from "react";
import ReactDOM from "react-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import "./index.css";
import RootContainer from "./containers/RootContainer";
import registerServiceWorker from "./registerServiceWorker";

import { buildDb as initFakeApi } from "./libs/fake-api/api";

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
  ReactDOM.render(
    <MuiThemeProvider theme={theme}>
      <Component />
    </MuiThemeProvider>,
    document.getElementById("root")
  );
};

// You may init any API service here

render(RootContainer);
registerServiceWorker();

initFakeApi();

if (module.hot) {
  module.hot.accept("./containers/RootContainer", () => {
    render(RootContainer);
  });
}
