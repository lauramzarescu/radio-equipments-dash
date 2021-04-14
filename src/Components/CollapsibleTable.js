import React from "react";
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

function createData(name, features, uploads, last_upload, last_week) {
  let active = null;

  if (last_week >= 10) {
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
  } else if (last_week < 10 && last_week >= 5) {
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
  } else {
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
  return {
    name,
    features,
    uploads,
    last_upload,
    active,
    feature_list: [
      { name: "EQ1_upload", records: "1009", datetime: "01-04-2021" },
      { name: "EQ1_upload_test", records: "786", datetime: "01-04-2021" },
    ],
  };
}

const filename = "Csv-file",
  fields = {
    index: "Index",
    guid: "GUID",
  },
  style = {
    padding: "5px",
  },
  data = [
    { index: 0, guid: "asdf231234" },
    { index: 1, guid: "wetr2343af" },
  ],
  text = "Convert Json to Csv";

function Row({ row, setActive, setDownloads, downloads }) {
  // const { row } = props.row;
  const setActiveDownload = setActive;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  const { saveAsCsv } = useJsonToCsv();

  function handleExcelConvertButton(e, upload) {
    e.preventDefault();
    saveAsCsv({ data, fields, filename });
    setActiveDownload(true);
    setDownloads([...downloads, upload]);
  }

  const setDownloadsHelper = (filename) => {
    console.log(filename)
    setDownloads([...filename]);
  }

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.features}</TableCell>
        <TableCell align="right">{row.uploads}</TableCell>
        <TableCell align="right">
          {row.last_upload}
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
        </TableCell>
        <TableCell align="right">{row.active}</TableCell>
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
                              handleExcelConvertButton(e, feature_listRow.name);
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

const rows = [
  createData("Echipament 1", 159, 6.0, "2020-01-05", 4),
  createData("Echipament 2", 237, 9.0, "2020-01-05", 10),
  createData("Echipament 3", 262, 16.0, "2020-01-05", 6),
  createData("Echipament 4", 305, 3.7, "2020-01-05", 12),
  createData("Echipament 5", 356, 16.0, "2020-01-05", 9),
];

export default function CollapsibleTable({ setActive, setDownloads, downloads }) {
  const classes = useRowStyles();

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell className={classes.header}>Equipment name</TableCell>
            <TableCell align="right" className={classes.header}>
              Number of features
            </TableCell>
            <TableCell align="right" className={classes.header}>
              Number of uploads
            </TableCell>
            <TableCell align="right" className={classes.header}>
              Last upload
            </TableCell>
            <TableCell align="right" className={classes.header}>
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
