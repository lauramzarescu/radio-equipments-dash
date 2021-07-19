import React, { useState, useEffect } from "react";

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

import AddIcon from "@material-ui/icons/Add";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import AllInboxIcon from "@material-ui/icons/AllInbox";

import * as XLSX from "xlsx";

import ColorTheme from "../Theme/ThemeProvider";

import {
  getAllEquipmentsApi,
  getEquipmentFeaturesApi,
  uploadDataToEquipmentApi,
} from "./../api/models";

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
    display: "none",
  },
  selectInput: {
    borderColor: ColorTheme.palette.primary.neutralButton,
  },
}));

export const UploadData = () => {
  const classes = useStyles();

  const [rows, setRows] = useState([]);                           //randurile tabelului
  const [openAlert, setOpenAlert] = useState(false);              //variabila pentru deschiderea erorii
  const [uploadSuccess, setUploadSuccess] = useState(false);      //upload-ul a fost facut cu succes
  const [openSelect, setOpenSelect] = React.useState(false);      // deschidem explorer-ul pentru selectarea fisierului
  const [equipmentSelected, setEquipmentSelected] = useState(""); // echipamentul selectat
  const [equipmentsList, setEquipmentsList] = useState([]);       // lista tuturor echipamentelor
  const [columns, setColumns] = useState([]);                     //coloanele tabelului
  const [uploadedFile, setUploadedFile] = useState(null);         //fisierul incarcat
  const [fileRecords, setFileRecords] = useState(0);              // randurile fisierului
  const [headers, setHeaders] = useState([]);                     // caracteristicile fisierului
  const [headersNotMatch, setHeadersNotMatch] = useState(false);  // verificam daca caracteristicile fisierului
                                                                  // se potrivesc cu cele ale echipamentului

  useEffect(() => {
    if (!equipmentsList.length) {
      getAllEquipmentsApi().then((data) => {
        setEquipmentsList(data);
      });
    }
    console.log(equipmentsList);
  }, [equipmentsList]);

  useEffect(() => {
    console.log(uploadedFile);
  }, [uploadedFile]);

  const selectEquipment = (event) => {
    setEquipmentSelected(event.target.value);
    setColumns([]);
    setOpenAlert(false);
  };

  useEffect(() => {
    console.log(columns);
    if (!columns.length) {
      getEquipmentFeaturesApi(equipmentSelected).then((data) => {
        let arr = [];
        if (data[0]) {
          data[0].features.forEach((column) => {
            if (
              column.label !== "id" &&
              column.label !== "created_date" &&
              column.label !== "batch"
            ) {
              let obj = {
                field: column.label,
                headerName: column.label,
                width: 150,
                sortable: true,
              };
              arr.push(obj);
            }
          });
          console.log(arr);
          setColumns(arr);
        }
      });
    }
  }, [equipmentSelected, columns]);

  useEffect(() => {
    console.log(headers);
  }, [headers]);

  function UploadFileToDatabase() {
    if (checkSelectedFileHeaders()) {
      let formData = new FormData();
      formData.append("file", uploadedFile, uploadedFile.name);
      formData.append("equipment", equipmentSelected);
      formData.append("records", fileRecords);
      uploadDataToEquipmentApi(formData);
      setUploadSuccess(true);
      setRows([]);
      setColumns([]);
      setHeadersNotMatch(false);
    } 
  }

  function checkSelectedFileHeaders() {
    let temp_columns = [];

    for (let i = 0; i < columns.length; i++) {
      temp_columns.push(columns[i].headerName);
    }

    if (temp_columns.length !== headers.length) {
      setHeadersNotMatch(true);
      return false;
    }

    console.log(temp_columns)
    console.log(headers)

    for (let j = 0; j < temp_columns.length; j++) {
      if (temp_columns[j].trim().localeCompare(headers[j].trim()) !== 0) {
        console.log(j, temp_columns[j].trim(), headers[j].trim())
        console.log("merge")
        setHeadersNotMatch(true);
        return false;
      }
    }
    

    setHeadersNotMatch(false);
    return true;
  }

  function setFileUploaded(data) {
    var counter = 0;
    var data_rows = [];

    setFileRecords(data.length);

    let file_headers = [];

    for (let ii = 0; ii < data[0].length; ii++) {
      file_headers.push(data[0][ii]);
    }

    setHeaders(file_headers);

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
    console.log(data_rows);
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

  const handleSuccessClose = () => {
    setUploadSuccess(false);
  };

  const handleHeadersMatchClose = () => {
    setHeadersNotMatch(false);
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
    setUploadedFile(f);
    var reader = new FileReader();
    reader.onload = function (e) {
      var data = e.target.result;
      let readedData = XLSX.read(data, { type: "binary", cellDates: true });
      const wsname = readedData.SheetNames[0];
      const ws = readedData.Sheets[wsname];

      const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1 });
      console.log(dataParse);
      sessionStorage.setItem("currentUploadFile", JSON.stringify(dataParse));
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
          <Button
            variant="outlined"
            className={classes.buttonBack}
            onClick={handleSelectBoxOpen}
            startIcon={<AllInboxIcon />}
          >
            {equipmentSelected || "Select equipment"}
          </Button>

          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel
              id="demo-simple-select-label"
              className={classes.selectInput}
            >
              Equipment
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select-outlined"
              value={equipmentSelected}
              onChange={selectEquipment}
              open={openSelect}
              onOpen={handleSelectBoxOpen}
              onClose={handleSelectBoxClose}
              label="equipment"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {equipmentsList.map((data, index) => {
                return (
                  <MenuItem key={index} value={data.name}>
                    {data.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            component="label"
            className={classes.buttonBack}
            startIcon={<AddIcon />}
          >
            Upload File from PC
            <input type="file" hidden onChange={handleUpload} />
          </Button>
          <Button
            variant="outlined"
            component="label"
            className={classes.buttonNext}
            style={{ float: "right" }}
            startIcon={<CloudUploadIcon />}
            onClick={UploadFileToDatabase}
          >
            Upload File to database
          </Button>
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
          <Snackbar
            open={uploadSuccess}
            autoHideDuration={6000}
            onClose={handleSuccessClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert onClose={handleSuccessClose} severity="success">
              Your file was uploaded successfully!
            </Alert>
          </Snackbar>
          <Snackbar
            open={headersNotMatch}
            autoHideDuration={6000}
            onClose={handleHeadersMatchClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert onClose={handleHeadersMatchClose} severity="error">
              The equipment selected does not match with the uploaded file!
            </Alert>
          </Snackbar>
        </Grid>
      </Grid>
    </>
  );
};
