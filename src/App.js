import "./App.css";
import { Sidebar } from "./Components/Sidebar";
import { Content } from "./Components/Content";

import { MuiThemeProvider } from "@material-ui/core/styles";
import ColorTheme from "./Theme/ThemeProvider";

import { Grid } from "@material-ui/core";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <MuiThemeProvider theme={ColorTheme}>
        <React.Fragment>
          <Grid
            container
            className="wrapper"
            style={{ backgroundColor: ColorTheme.palette.secondary.main }}
          >
            <Grid container className="container">
              <Grid
                item
                className="container-split"
                xs={4}
                sm={3}
                md={3}
                lg={2}
                xl={2}
                spacing={3}
              >
                <Sidebar />
              </Grid>
              <Grid
                item
                className="container-split"
                xs={8}
                sm={9}
                md={9}
                lg={10}
                xl={10}
                spacing={3}
              >
                <Content />
              </Grid>
            </Grid>
          </Grid>
        </React.Fragment>
      </MuiThemeProvider>
    </Router>
  );
}

export default App;
