import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Chip from "@material-ui/core/Chip";
import Tooltip from "@material-ui/core/Tooltip";
import ColorTheme from "./../Theme/ThemeProvider";

import GetAppIcon from "@material-ui/icons/GetApp";
import { JsonToCsv, useJsonToCsv } from "react-json-csv";
import axios from "axios";

import {
  getTableSimpleDataApi,
  getUploadsApi,
  downloadFileApi,
  getLastWeekApi,
} from "./../api/models";

const FileDownload = require("js-file-download");

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  header: {
    fontWeight: "bold",
  },
  chipCompleted: {
    backgroundColor: ColorTheme.palette.primary.successButton + "!important",
    color: "#22521d",
  },
});

function createData(id, name, features, uploads, last_upload) {
  let active = null;

  let lastWeek = 4;
  // getLastWeekApi(id).then((data) => {
  //   lastWeek = data[0].count;
  //   console.log(lastWeek)
  // });

  if (lastWeek >= 10) {
    active = (
      <Chip
        label="High usage"
        variant="outlined"
        style={{
          borderColor: ColorTheme.palette.primary.successButton,
          color: ColorTheme.palette.primary.successButton,
        }}
      />
    );
  }
  if (lastWeek < 10 && lastWeek >= 5) {
    active = (
      <Chip
        label="Medium usage"
        variant="outlined"
        style={{
          borderColor: ColorTheme.palette.primary.activeButtonText,
          color: ColorTheme.palette.primary.activeButtonText,
        }}
      />
    );
  }
  if (lastWeek > 0 && lastWeek < 5) {
    active = (
      <Chip
        label="Low usage"
        variant="outlined"
        style={{
          borderColor: ColorTheme.palette.primary.errorButton,
          color: ColorTheme.palette.primary.errorButton,
        }}
      />
    );
  }

  if (lastWeek === 0) {
    active = (
      <Chip
        label="No usage"
        variant="outlined"
        style={{
          borderColor: ColorTheme.palette.primary.errorButton,
          color: ColorTheme.palette.primary.errorButton,
        }}
      />
    );
  }
  let uploads_list = [];

  getUploadsApi(id).then((data) => {
    data.forEach((upload) => {
      uploads_list.push({
        download_location: upload.aws_location,
        name: upload.aws_location.substring(
          upload.aws_location.lastIndexOf("/") + 1,
          upload.aws_location.length
        ),
        records: upload.file_records,
        datetime: upload.created_date
          ? upload.created_date
              .replace(/T|Z/gi, function (x) {
                return " ";
              })
              .slice(0, -5)
          : null,
      });
    });
  });

  return {
    name,
    features,
    uploads,
    last_upload,
    active,
    feature_list: uploads_list,
  };
}

function Row({ row, setActive, setDownloads, downloads }) {
  const setActiveDownload = setActive;
  const [open, setOpen] = React.useState(false);

  const classes = useRowStyles();

  function handleExcelConvertButton(e, file, equipment) {
    e.preventDefault();
    downloadFileApi(file, equipment).then((data) => {
      const link = document.createElement("a");
      link.href = data;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setActiveDownload(true);
      setDownloads([...downloads, file]);
    });
  }

  const setDownloadsHelper = (filename) => {
    console.log(filename);
    setDownloads([...filename]);
  };

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          {row.uploads ? (
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          ) : null}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="center">{row.features}</TableCell>
        <TableCell align="center">{row.uploads}</TableCell>
        <TableCell align="center">
          {row.last_upload ?? "Not available"}
          {row.last_upload ? (
            <Tooltip title={"Get latest upload from " + row.name}>
              <IconButton
                aria-label="delete"
                style={{
                  color: ColorTheme.palette.primary.activeButtonText,
                }}
                size="medium"
                onClick={(e) => {
                  handleExcelConvertButton(e, "test");
                }}
              >
                <GetAppIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
          ) : null}
        </TableCell>
        <TableCell align="center">{row.active}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                className={classes.header}
              >
                Last uploads
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.header}>
                      Upload name
                    </TableCell>
                    <TableCell className={classes.header}>Records</TableCell>
                    <TableCell className={classes.header}>
                      Created date
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.feature_list.map((feature_listRow) => (
                    <TableRow key={feature_listRow.name}>
                      <TableCell component="th" scope="row">
                        {feature_listRow.name}
                      </TableCell>
                      <TableCell>{feature_listRow.records}</TableCell>
                      <TableCell>
                        {feature_listRow.datetime}
                        <Tooltip title={"Get " + feature_listRow.name}>
                          <IconButton
                            aria-label="delete"
                            style={{
                              color:
                                ColorTheme.palette.primary.activeButtonText,
                            }}
                            size="medium"
                            onClick={(e) => {
                              handleExcelConvertButton(
                                e,
                                feature_listRow.name,
                                row.name
                              );
                            }}
                          >
                            <GetAppIcon fontSize="inherit" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable({
  setActive,
  setDownloads,
  downloads,
}) {
  const classes = useRowStyles();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (!rows.length) {
      getTableSimpleDataApi().then((data) => {
        const data_rows = [];
        data.forEach((equipment) => {
          console.log(equipment);
          // getLastWeekApi(equipment.id).then((res) => {
          //   // lastWeek = data[0].count;
          //   console.log(res[0].count);
          // });
          data_rows.push(
            createData(
              equipment.id,
              equipment.name,
              equipment.number_of_features,
              equipment.number_of_uploads,
              equipment.created_date
                ? equipment.created_date
                    .replace(/T|Z/gi, function (x) {
                      return " ";
                    })
                    .slice(0, -5)
                : null
            )
          );
        });
        setRows(data_rows);
        console.log(data_rows);
      });
    }
  }, [rows]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell className={classes.header}>Equipment name</TableCell>
            <TableCell align="center" className={classes.header}>
              Number of features
            </TableCell>
            <TableCell align="center" className={classes.header}>
              Number of uploads
            </TableCell>
            <TableCell align="center" className={classes.header}>
              Last upload
            </TableCell>
            <TableCell align="center" className={classes.header}>
              State
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row
              key={row.name}
              row={row}
              setActive={setActive}
              setDownloads={setDownloads}
              downloads={downloads}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
