import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Fab from "@material-ui/core/Fab";

import DoneIcon from "@material-ui/icons/Done";
import AddIcon from "@material-ui/icons/Add";

import ColorTheme from "./../Theme/ThemeProvider";

const CustomTextField = withStyles({
  root: {
    paddingBottom: 20,
    "& label.Mui-focused": {
      color: "rgba(255, 255, 255, 0.1)",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "rgba(255, 255, 255, 0.1)",
    },
  },
})(TextField);

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    transition: "all 0.5s ease",
  },
  button: {
    marginRight: theme.spacing(1),
    backgroundColor: ColorTheme.palette.primary.activeButtonText,
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  buttonBack: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    color: ColorTheme.palette.primary.neutralButton,
    borderColor: ColorTheme.palette.primary.neutralButton,
    fontWeight: "bold",
  },
  buttonNext: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    color: ColorTheme.palette.primary.successButton,
    borderColor: ColorTheme.palette.primary.successButton,
    fontWeight: "bold",
  },
  buttonReset: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    color: ColorTheme.palette.primary.errorButton,
    borderColor: ColorTheme.palette.primary.errorButton,
    fontWeight: "bold",
  },
  stepIconCustom: {
    color: ColorTheme.palette.primary.activeBorder + "!important",
  },
  labelText: {
    fontWeight: "bold!important",
  },
  stepContent: {
    width: "100%",
    padding: 20,
    fontWeight: "bold",
  },
  chipCompleted: {
    backgroundColor: ColorTheme.palette.primary.successButton + "!important",
    color: "#22521d",
  },
}));

function getSteps() {
  return [
    "Select a name for your activity",
    "Select the equipments for file uploading",
    "Validate data",
  ];
}

export default function ActivityStepper({setParentActivities, parentActivities}) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedEquipments, setSelectedEquipments] = useState([]);
  const [activityName, setActivityName] = useState(null);
  const [activityDescription, setActivityDescription] = useState(null);
  const [activities, setActivities] = useState([]);
  const steps = getSteps();

  const equipments = [
    {
      name: "Equipment 1",
    },
    {
      name: "Equipment 2",
    },
    {
      name: "Equipment 3",
    },
    {
      name: "Equipment 4",
    },
    {
      name: "Equipment 5",
    },
  ];

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      setActivities((activities) => [
        ...activities,
        {
          key: activities.length + 1,
          name: activityName,
          description: activityDescription,
          equipments: selectedEquipments,
        },
      ]);
      setParentActivities((parentActivities) => [
        ...parentActivities,
        {
          key: parentActivities.length + 1,
          name: activityName,
          description: activityDescription,
          equipments: selectedEquipments,
        },
      ]);
      setSelectedEquipments([]);
      setActivityName(null);
      setActivityDescription(null);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleDelete = (equipmentToDelete) => () => {
    setSelectedEquipments((selectedEquipments) =>
      selectedEquipments.filter(
        (equipment) => equipment.key !== equipmentToDelete.key
      )
    );
  };

  useEffect(() => {
    console.log(selectedEquipments);
  }, [selectedEquipments]);

  useEffect(() => {
    console.log(activities);
  }, [activities]);

  function keyPress(e) {
    if (e.keyCode === 13) {
      if (e.target.value === "") {
        return;
      }
      setSelectedEquipments((selectedEquipments) => [
        ...selectedEquipments,
        { key: selectedEquipments.length + 1, name: e.target.value },
      ]);
    }
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <Grid item xs={12}>
            <CustomTextField
              id="standard-basic"
              label="Activity name"
              value={activityName}
              onChange={(e) => setActivityName(e.target.value)}
            />
            <CustomTextField
              id="outlined-multiline-static"
              style={{ width: "250px", marginLeft: 30 }}
              label="Description"
              multiline
              rows={4}
              defaultValue={activityDescription}
              onChange={(e) => setActivityDescription(e.target.value)}
              variant="outlined"
            />
          </Grid>
        );
      case 1:
        return (
          <Grid container>
            <Grid item xs={4}>
              <Autocomplete
                id="combo-box-demo"
                options={equipments}
                getOptionLabel={(option) => option.name}
                style={{ width: 300 }}
                onKeyDown={keyPress}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select your equipments"
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item xs={8}>
              {selectedEquipments.map((data, index) => {
                return (
                  <Chip
                    style={{ margin: "0 10px 10px 0" }}
                    key={data.key}
                    avatar={<Avatar>{data.name[0]}</Avatar>}
                    label={data.name}
                    onDelete={handleDelete(data)}
                  />
                );
              })}
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid item xs={8}>
            {selectedEquipments.map((data, index) => {
              return (
                <Chip
                  classes={{ root: classes.chipCompleted }}
                  style={{ margin: "0 10px 10px 0" }}
                  key={data.key}
                  icon={<DoneIcon />}
                  label={data.name}
                />
              );
            })}
          </Grid>
        );
      default:
        return "Unknown step";
    }
  }

  return (
    <div className={classes.root}>
        <Stepper
          activeStep={activeStep}
          style={{ padding: 0, marginTop: "25px" }}
        >
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel
                  {...labelProps}
                  classes={{
                    label: classes.labelText,
                  }}
                  StepIconProps={{
                    classes: {
                      completed: classes.stepIconCustom,
                      active: classes.stepIconCustom,
                      root: classes.stepIconCustom,
                    },
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed - you&apos;re finished
              </Typography>
              <Button onClick={handleReset} className={classes.buttonReset}>
                Reset
              </Button>
            </div>
          ) : (
            <div>
              <Grid container className={classes.stepContent}>
                {getStepContent(activeStep)}
              </Grid>
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.buttonBack}
                >
                  Back
                </Button>

                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleNext}
                  className={classes.buttonNext}
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </div>
            </div>
          )}
        </div>
    </div>
  );
}
