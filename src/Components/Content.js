import React from "react";
import "../styles/Content.css";

import { Switch, Route, Link } from "react-router-dom";
import routes from "../Actions/routes";

import { Paper, Grid } from "@material-ui/core";

export const Content = () => {
  return (
    <>
      <Switch>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            children={<route.main />}
          />
        ))}
      </Switch>
      {/* <Paper
        className="content-paper"
        style={{ backgroundColor: "transparent" }}
      >
        <Grid container>
          <Grid item xs={4} sm={3} md={3} lg={3} xl={2}>
            <Paper className="total-equipments" elevation={2}></Paper>
          </Grid>
        </Grid>
      </Paper> */}
    </>
  );
};
