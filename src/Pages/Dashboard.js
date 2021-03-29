import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { SvgIcon } from "@material-ui/core";

import Paper from "@material-ui/core/Paper";

import Lottie from "react-lottie";
import * as animation from "../Animations/waves.json";

import NumberOfEquipments from "../Icons/icons8-combo-chart-100.png";
import NumberOfUploads from "../Icons/icons8-schedule-100.png";
import LastUpload from "../Icons/icons8-last-24-hours-100.png";

import ColorTheme from "../Theme/ThemeProvider";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    flexGrow: 1,
  },
  gridItem: {
    height: "200px",
    // margin: "0 50px 0 50px",
  },
  stats: {
    backgroundColor: ColorTheme.palette.primary.main,
    width: "100%",
    height: "100%",
  },
  totalEquipmentsTitle: {
    width: "100%",
    height: "55px",
    padding: 8,
    backgroundColor: ColorTheme.palette.primary.successButton,
  },
  icon: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
  dataStats: {
    width: "100%",
    height: "60px",
    backgroundColor: ColorTheme.palette.primary.activeButtonText,
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  cardContent: {
    position: 'relative',
    minHeight: 'calc(200px - 98%)'
  },
  header: {
    height: '100px'
  },
  paper: {
    padding: '16px',

  }
}));

export const Dashboard = () => {
  const classes = useStyles();

  // const [, set] = useState(initialState)

  const bull = <span className={classes.bullet}>•</span>;

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const stats = [
    {
      label: "Number of equipments",
      icon: NumberOfEquipments,
    },
    {
      label: "Number of uploads",
      icon: NumberOfUploads,
    },
    {
      label: "Last upload",
      icon: LastUpload,
    },
  ];

  return (
    <>
      <Grid
        container
        className={classes.gridContainer}
        spacing={2}
        justify="center"
      >
        <Grid item xs={12}>
          <Paper elevation={3} className={classes.paper}>
        
          </Paper>
        </Grid>
        {stats.map((data, index) => {
          return (
            <Grid
              key={index}
              item
              xs={10}
              sm={10}
              md={8}
              lg={4}
              xl={3}
              className={classes.gridItem}
            >
              <Paper className={classes.stats} elevation={3}>
                <CardContent>
                  {/* <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Word of the Day
              </Typography>
               */}
                  {/* <Lottie
                options={defaultOptions}
                height={400}
                width={400}
              /> */}
                  <Typography variant="h5" component="h2">
                    <img
                      src={data.icon}
                      alt={data.label}
                      className={classes.icon}
                    />
                  </Typography>

                  {/* <Typography className={classes.pos} color="textSecondary">
                    adjective
                  </Typography> */}
                  <Typography variant="body2" component="p">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                  </Typography>
                </CardContent>
                <CardActions className={classes.cardContent}>
                  <Paper className={classes.dataStats} elevation={5}></Paper>
                </CardActions>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
