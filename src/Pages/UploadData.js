import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import { DataGrid } from "@material-ui/data-grid";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

import * as XLSX from "xlsx";

import ColorTheme from "../Theme/ThemeProvider";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    height: "100%",
  },
  upperContainer: {
    height: "7%",
  },
  lowerContainer: {
    height: "93%",
  },
  btn: {
    fontWeight: "bold",
    lineHeight: "30px",
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
    color: ColorTheme.palette.primary.neutralButton,
    display: "none"
  },
  selectInput: {
    borderColor: ColorTheme.palette.primary.neutralButton
  },
}));

export const UploadData = () => {
  const classes = useStyles();

  const [rows, setRows] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [openSelect, setOpenSelect] = React.useState(false);
  const [equipmentSelected, setEquipmentSelected] = useState("");
  const [columns, setColumns] = useState([
    {
      field: "ora",
      headerName: "Ora",
      width: 100,
      sortable: true,
    },
    {
      field: "frecventa",
      headerName: "Frecventa (MHz)",
      width: 200,
    },
    {
      field: "nr_mas",
      headerName: "Nr. de masuratori",
      width: 200,
    },
    {
      field: "azimut",
      headerName: "Azimut",
      width: 130,
    },
    {
      field: "confidenta",
      headerName: "Confidenta (0-99)",
      width: 200,
    },
    {
      field: "niv_mas",
      headerName: "Nivel masurat (-10 pana la -130)",
      width: 280,
    },
    {
      field: "lat_n",
      headerName: "Latitudine N",
      width: 160,
    },
    {
      field: "lat_e",
      headerName: "Latitudine E",
      width: 160,
    },
  ]);

  const hardcoded_equipments = ["Echipament 1", "Echipament 2", "Echipament 3"];

  const selectEquipment = (event) => {
    setEquipmentSelected(event.target.value);
    setOpenAlert(false);
  };

  function setFileUploaded(data) {
    var counter = 0;
    var data_rows = [];

    for (let i = 1; i < data.length; i++) {
      data_rows.push({
        id: counter,
      });
      for (let j = 0; j < data[i].length; j++) {
        for (let k = 0; k < data[i].length; k++) {
          data_rows[counter][columns[j].field] = data[i][j];
        }
      }
      counter++;
    }

    setRows(data_rows);
  }

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const handleSelectBoxClose = () => {
    setOpenSelect(false);
  };

  const handleSelectBoxOpen = () => {
    setOpenSelect(true);
  };

  function handleUpload(e) {
    if (!equipmentSelected) {
      setOpenAlert(true);
      e.target.value = "";
      return;
    }

    e.preventDefault();

    var files = e.target.files;
    var f = files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
      var data = e.target.result;
      let readedData = XLSX.read(data, { type: "binary" });
      const wsname = readedData.SheetNames[0];
      const ws = readedData.Sheets[wsname];

      const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1 });
      console.log(dataParse);
      setFileUploaded(dataParse);
    };
    reader.readAsBinaryString(f);

    e.target.value = "";
  }

  return (
    <>
      <Grid container className={classes.gridContainer}>
        <Grid
          item
          xs={12}
          className={classes.upperContainer}
          color={ColorTheme.palette.primary.main}
          justify="center"
        >
          {/* <Paper
            style={{
              backgroundColor: ColorTheme.palette.primary.main,
              height: "100%",
              width: "100%",
            }}
            elevation={2}
          > */}
          <Button
              variant="outlined"
              className={classes.buttonBack}
              onClick={handleSelectBoxOpen}
            >
              {equipmentSelected || "Select equipment"}
            </Button>
            
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-label" className={classes.selectInput}>Equipment</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select-outlined"
              value={equipmentSelected}
              onChange={selectEquipment}
              open={openSelect}
              onOpen={handleSelectBoxOpen}
              onClose={handleSelectBoxClose}
              label="equipment"
              // outlined={classes.buttonBack}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {hardcoded_equipments.map((data, index) => {
                return (
                  <MenuItem key={index} value={data}>{data}</MenuItem>
                )
              })}
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            component="label"
            className={classes.buttonBack}
          >
            Upload File from PC
            <input type="file" hidden onChange={handleUpload} />
          </Button>
          <Button
            variant="outlined"
            component="label"
            className={classes.buttonNext}
            style={{ float: "right" }}
          >
            Upload File to database
          </Button>
          {/* </Paper> */}
        </Grid>
        <Grid
          item
          xs={12}
          className={classes.lowerContainer}
          alignItems="flex-end"
        >
          <Paper
            style={{
              backgroundColor: ColorTheme.palette.primary.main,
              height: "100%",
              width: "100%",
            }}
            elevation={2}
          >
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={15}
              checkboxSelection
            />
          </Paper>
          <Snackbar
            open={openAlert}
            autoHideDuration={6000}
            onClose={handleAlertClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert onClose={handleAlertClose} severity="error">
              You need to select an equipment first!
            </Alert>
          </Snackbar>
        </Grid>
      </Grid>
    </>
  );
};
