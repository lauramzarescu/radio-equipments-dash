import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import { DataGrid } from "@material-ui/data-grid";

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
    color: "#33cc33",
    borderColor: "#33cc33",
    borderRadius: "25px",
    fontWeight: "bold",
    lineHeight: "30px",
  },
}));

export const UploadData = () => {
  const classes = useStyles();

  const [rows, setRows] = useState([]);
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
    console.log(rows);
  }

  function handleUpload(e) {
    console.log("test");
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
  }

  return (
    <>
      <Grid container className={classes.gridContainer}>
        <Grid item xs={12} className={classes.upperContainer}>
          <Button variant="outlined" component="label" className={classes.btn}>
            Upload File
            <input type="file" hidden onChange={handleUpload} />
          </Button>
          <Button variant="outlined" className={classes.btn}>
            Primary
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
        </Grid>
      </Grid>
    </>
  );
};
