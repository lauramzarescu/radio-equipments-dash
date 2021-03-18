import React from "react";
import "../styles/Content.css";

import { Paper, Grid } from "@material-ui/core";

export const Content = () => {
  return (
    <>
      <Paper
        className="content-paper"
        style={{ backgroundColor: "transparent" }}
      >
        <Grid container>
          <Grid item xs={4} sm={3} md={3} lg={3} xl={2}>
            <Paper className="total-equipments" elevation={2}></Paper>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};
