import React, { useState, useEffect } from "react";

import { Button, Chip, IconButton, Typography } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";

import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import FileCopyIcon from "@material-ui/icons/FileCopy";

import Lottie from "react-lottie";
import * as emptyActivities from "../Animations/empty-activities.json";

import { makeStyles } from "@material-ui/core/styles";
import ColorTheme from "../Theme/ThemeProvider";
import randomColor from "randomcolor";

import ActivityStepper from "../Components/AcitivityStepper";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    transition: "all 0.4s ease",
  },
  headbar: {
    transition: "all 0.4s ease",
    marginTop: 20,
  },
  gridHovered: {
    transition: "all 0.4s ease",
    transform: "scale(0)",
    transformOrigin: "top left",
    height: 0,
  },
  activitiesPaper: {
    marginTop: "20px",
    padding: "30px",
  },
  activityCard: {
    marginTop: 30,
    marginRight: 20,
    padding: 15,
  },
  deleteActivityBtn: {
    float: "right",
    width: 40,
    height: 40,
    backgroundColor: ColorTheme.palette.secondary.main,
    borderRadius: 12,
  },
  cloneActivityBtn: {
    float: "right",
    width: 40,
    height: 40,
    backgroundColor: ColorTheme.palette.secondary.main,
    borderRadius: 12,
    marginLeft: 5,
  },
  equipmentChip: {
    color: ColorTheme.palette.primary.neutralButton,
    borderColor: ColorTheme.palette.primary.neutralButton,
    margin: "10px 5px 0 0",
  },
}));

export const Activities = () => {
  const classes = useStyles();

  const [hovered, setHovered] = useState(true);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    console.log("Activities parent: ", activities);
  }, [activities]);

  const handleDeleteActivity = (activityToDelete) => () => {
    setActivities((activities) =>
      activities.filter((activity) => activity.key !== activityToDelete.key)
    );
  };

  const handleCloneActivity = (activityToClone) => () => {
    setActivities((activities) => [
      ...activities,
      {
        key: activities.length + 1,
        name: activityToClone.name + ' Copy',
        description: activityToClone.description,
        equipments: activityToClone.equipments,
      },
    ]);
  };

  return (
    <>
      <Grid container className={classes.gridContainer}>
        <Tooltip title="Add activity">
          <Fab
            style={{
              backgroundColor: ColorTheme.palette.primary.main,
              color: ColorTheme.palette.primary.activeButtonText,
            }}
            aria-label="add"
            onClick={() => setHovered(!hovered)}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
        <Grid
          item
          xs={12}
          justify="center"
          className={hovered ? classes.gridHovered : classes.headbar}
        >
          <Paper style={{ padding: "20px" }}>
            <Typography
              style={{ padding: "10px", fontWeight: "bold" }}
              variant="h6"
            >
              Add activity
            </Typography>
            <ActivityStepper
              setParentActivities={setActivities}
              parentAtivities={activities}
            />
          </Paper>
        </Grid>
        {activities.map((data, index) => {
          return (
            <Grid item xs={4} key={index}>
              <Paper className={classes.activityCard} elevation={2}>
                <Grid container width={1}>
                  <Grid item xs={8} height={30}>
                    <Typography style={{ fontWeight: "bold" }} variant="h6">
                      {data.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} height={30}>
                    <Tooltip title="Clone activity">
                      <IconButton
                        className={classes.cloneActivityBtn}
                        onClick={handleCloneActivity(data)}
                      >
                        <FileCopyIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete activity">
                      <IconButton
                        className={classes.deleteActivityBtn}
                        onClick={handleDeleteActivity(data)}
                      >
                        <CloseIcon />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">
                      {data.description}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} style={{ marginTop: 15 }}>
                    <Typography
                      style={{ fontWeight: "bold" }}
                      variant="subtitle2"
                    >
                      Equipments:
                    </Typography>
                    {data.equipments.map((eq, idx) => {
                      return (
                        <Chip
                          classes={{ root: classes.equipmentChip }}
                          variant="outlined"
                          key={idx}
                          label={eq.name}
                        />
                      );
                    })}
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
