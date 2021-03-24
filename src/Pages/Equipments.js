import React, { useState } from "react";

import PropTypes from "prop-types";

import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { withStyles } from "@material-ui/core/styles";

import ColorTheme from "../Theme/ThemeProvider";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DoneIcon from "@material-ui/icons/Done";
import ReorderOutlinedIcon from "@material-ui/icons/ReorderOutlined";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    height: "100%",
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
  resetContainer: {
    padding: theme.spacing(3),
  },
  stepIconCustom: {
    color: ColorTheme.palette.primary.activeBorder + "!important",
  },
  stepContent: {
    width: "100%",
    paddingBottom: 30,
    fontWeight: "bold",
  },
  formLabelRoot: {
    "&$formLabelFocused": {
      color: "rgba(255, 255, 255, 0.1)",
    },
  },
  labelText: {
    fontWeight: "bold!important",
  },
  dialogPaper: {
    width: "80%!important",
    maxHeight: 435,
  },
  chipCompleted: {
    backgroundColor: ColorTheme.palette.primary.successButton + "!important",
    color: "#22521d",
  },
  listItem: {
    width: "60%!important",
  },
  lisItemText: {
    width: '100%',
    flex: '0.5'
  }
}));

const options = [
  {
    id: 1,
    label: "int",
  },
  {
    id: 2,
    label: "text",
  },
  {
    id: 3,
    label: "float",
  },
  {
    id: 4,
    label: "datetime",
  },
];

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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const Equipments = () => {
  const classes = useStyles();

  const [activeStep, setActiveStep] = useState(0);
  const [chipData, setChipData] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = React.useState("int");
  const [activeChip, setActiveChip] = useState(0);
  const [openAlert, setOpenAlert] = useState(false);
  // const [completedChip, setCompletedChip] = useState([]);

  const handleClose = (newValue) => {
    setOpen(false);

    if (newValue) {
      setValue(newValue);
      let new_chip_data = [...chipData];
      // console.log(new_chip_data);
      // console.log(activeChip);
      let activeChipIndex = new_chip_data.findIndex(
        (obj) => obj.key === activeChip
      );
      // console.log(new_chip_data[activeChipIndex]);
      new_chip_data[activeChipIndex].type = newValue;
      // console.log(new_chip_data[activeChipIndex]);
    }
  };

  const steps = getSteps();

  React.useEffect(() => {
    // console.log(chipData);
    // let new_chip_data = [...chipData];
    // console.log(new_chip_data[activeChip]);
  }, [chipData]);

  const handleNext = () => {
    if (activeStep === 1) {
      for (let i = 0; i < chipData.length; i++) {
        if (!chipData[i].type) {
          setOpenAlert(true);
          return;
        }
      }
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  function getSteps() {
    return [
      "Set the name of the equipment",
      "Add the equipment's features",
      "Validate all features before creating a new equipment!",
    ];
  }

  function keyPress(e) {
    if (e.keyCode === 13) {
      console.log(e.target.value);
      setChipData((chipData) => [
        ...chipData,
        { key: chipData.length + 1, label: e.target.value, type: null },
      ]);
    }
  }

  function ConfirmationDialogRaw(props) {
    const { onClose, value: valueProp, open, ...other } = props;
    const [value, setValue] = React.useState(valueProp);

    const radioGroupRef = React.useRef(null);

    const handleEntering = () => {
      if (radioGroupRef.current != null) {
        radioGroupRef.current.focus();
      }
    };

    const handleCancel = () => {
      onClose();
    };

    const handleOk = () => {
      onClose(value);
    };

    const handleChange = (event) => {
      setValue(event.target.value);
    };

    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="xs"
        onEntering={handleEntering}
        aria-labelledby="confirmation-dialog-title"
        open={open}
        {...other}
      >
        <DialogTitle id="confirmation-dialog-title">Phone Ringtone</DialogTitle>
        <DialogContent dividers>
          <RadioGroup
            ref={radioGroupRef}
            aria-label="ringtone"
            name="ringtone"
            value={value}
            onChange={handleChange}
          >
            {options.map((option) => (
              <FormControlLabel
                value={option.label}
                key={option.id}
                control={<Radio />}
                label={option.label}
              />
            ))}
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleCancel}
            color="primary"
            className={classes.buttonReset}
          >
            Cancel
          </Button>
          <Button
            onClick={handleOk}
            color="primary"
            className={classes.buttonNext}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <Grid item xs={12}>
            <form noValidate autoComplete="off">
              <CustomTextField id="standard-basic" label="Standard" />
            </form>
          </Grid>
        );
      case 1:
        return (
          <Grid item xs={12}>
            <CustomTextField
              id="standard-basic"
              label="Standard"
              onKeyDown={keyPress}
              inputProps={{ maxLength: 20 }}
            />
            <br></br>
            {chipData.map((data) => {
              return (
                <Chip
                  classes={data.type ? { root: classes.chipCompleted } : null}
                  style={{ margin: "0 10px 10px 0" }}
                  key={data.key}
                  avatar={!data.type ? <Avatar>{data.label[0]}</Avatar> : null}
                  icon={data.type ? <DoneIcon /> : null}
                  label={data.label}
                  onClick={handleClick(data)}
                  onDelete={handleDelete(data)}
                />
              );
            })}
            <ConfirmationDialogRaw
              classes={{
                paper: classes.paper,
              }}
              id="ringtone-menu"
              keepMounted
              open={open}
              onClose={handleClose}
              value={value}
            />
          </Grid>
        );
      case 2:
        return (
          <Grid item xs={12}>
            <List subheader={<ListSubheader>Features</ListSubheader>}>
              {chipData.map((data) => {
                return (
                  <ListItem divider className={classes.listItem}>
                    <ListItemIcon>
                      <ReorderOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText
                      className={classes.lisItemText}
                      primary={data.label}
                    />
                    <ListItemText
                      className={classes.lisItemText}
                      primary={data.type}
                    />
                  </ListItem>
                );
              })}
            </List>
          </Grid>
        );
      default:
        return "Unknown step";
    }
  }

  ConfirmationDialogRaw.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
  };

  const handleClick = (chip) => () => {
    setOpen(true);
    setActiveChip(chip.key);
  };

  return (
    <>
      <Grid container className={classes.gridContainer}>
        <Paper
          style={{
            backgroundColor: ColorTheme.palette.primary.main,
            height: "100%",
            width: "100%",
          }}
          elevation={2}
        >
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel
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
                <StepContent>
                  <Grid container className={classes.stepContent}>
                    {getStepContent(index)}
                  </Grid>
                  <div className={classes.actionsContainer}>
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
                        onClick={handleNext}
                        className={classes.buttonNext}
                      >
                        {activeStep === steps.length - 1 ? "Finish" : "Next"}
                      </Button>
                    </div>
                  </div>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={0} className={classes.resetContainer}>
              <Typography>
                All steps completed - you&apos;re finished
              </Typography>
              <Button onClick={handleReset} className={classes.buttonReset}>
                Reset
              </Button>
            </Paper>
          )}
          <Snackbar
            open={openAlert}
            autoHideDuration={6000}
            onClose={handleAlertClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert onClose={handleAlertClose} severity="error">
              You need to choose a data type for each feature!
            </Alert>
          </Snackbar>
        </Paper>
      </Grid>
    </>
  );
};
