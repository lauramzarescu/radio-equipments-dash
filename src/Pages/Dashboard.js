import React, { useState, useEffect } from "react";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { SvgIcon } from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import Tooltip from "@material-ui/core/Tooltip";
import InputBase from "@material-ui/core/InputBase";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import Paper from "@material-ui/core/Paper";

import NotificationsIcon from "@material-ui/icons/Notifications";
import SearchIcon from "@material-ui/icons/Search";

import Lottie from "react-lottie";
import * as animation from "../Animations/waves.json";
import * as uploads from "../Animations/uploads.json";
import * as last_upload from "../Animations/last_upload.json";
import * as features from "../Animations/features.json";
import * as empty from "../Animations/empty.json";
import * as average from "../Animations/average.json";
import * as loading from "../Animations/loading.json";
import * as download from "../Animations/download.json";

import ColorTheme from "../Theme/ThemeProvider";

import CollapsibleTable from "./../Components/CollapsibleTable";
import {
  getNumberOfEquipmentsApi,
  getNumberOfUploadsApi,
  getLastUploadApi,
} from "./../api/models";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    flexGrow: 1,
  },
  gridItem: {
    height: "240px",
  },
  stats: {
    backgroundColor: ColorTheme.palette.primary.main,
    width: "80%",
    height: "100%",
    "&:hover": {
      border: "2px solid " + ColorTheme.palette.primary.activeButtonText,
    },
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
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  cardContent: {
    position: "relative",
    minHeight: "calc(200px - 63%)",
  },
  header: {
    height: "100px",
  },
  paper: {
    padding: "16px",
    height: "100%",
  },
  title: {
    textAlign: "center",
    color: ColorTheme.palette.primary.activeButtonText,
  },
  numbers: {
    textAlign: "center",
    color: ColorTheme.palette.primary.main,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translateX(-50%) translateY(-50%)",
    fontWeight: "bold",
    fontSize: "15px",
  },
  searchBarRoot: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "50%",
    backgroundColor: ColorTheme.palette.secondary.main,
    transition: "width 0.3s",
    boxShadow: "none",
    "&:hover": {
      width: "100%",
      transition: "width 0.3s",
    },
  },
  inputSearchBar: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButtonSearchBar: {
    padding: 10,
  },
  setOpacityLow: {
    opacity: "0.3!important",
  },
}));

export const Dashboard = () => {
  const classes = useStyles();

  const [activeDownload, setActiveDownload] = useState(false);
  const [downloads, setDownloads] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [downloadAnimation, setDownloadAnimation] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [numberOfEquipments, setNumberOfEquipments] = useState(null);
  const [numberOfUploads, setNumberOfUploads] = useState(null);
  const [lastUpload, setLastUpload] = useState(null);

  useEffect(() => {
    if (!numberOfEquipments) {
      getNumberOfEquipmentsApi().then((data) => {
        setNumberOfEquipments(data[0]["count(*)"]);
      });
    }
    if (!numberOfUploads) {
      getNumberOfUploadsApi().then((data) => {
        setNumberOfUploads(data[0]["count(*)"]);
      });
    }
    if (!lastUpload) {
      getLastUploadApi().then((data) => {
        setLastUpload(
          data[0]["created_date"]
            .replace(/T|Z/gi, function (x) {
              return " ";
            })
            .slice(0, -5)
        );
      });
    }
  }, [numberOfEquipments, numberOfUploads, lastUpload]);

  useEffect(() => {
    console.log("active download: ", activeDownload);
    if (activeDownload) {
      handleAlertClick();
      setAnimationComplete(false);
    }
  }, [activeDownload]);

  useEffect(() => {
    console.log(downloads);
  }, [downloads]);

  useEffect(() => {
    if (downloadAnimation) {
      setTimeout(() => {
        console.log("complete");
        setDownloadAnimation(false);
        setAnimationComplete(true);
        setActiveDownload(false);
      }, 6000);
    }
  });

  const handleAlertClick = () => {
    setOpen(true);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setDownloadAnimation(true);
    setOpen(false);
  };

  const bull = <span className={classes.bullet}>•</span>;

  function getAnimationSettings(animation, loop = true) {
    return {
      loop: loop,
      autoplay: true,
      animationData: animation.default,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
        progressiveLoad: true,
      },
    };
  }

  function setActiveDownloadHelper() {
    setActiveDownload(true);
  }

  const stats = [
    {
      label: "Number of equipments",
      icon: getAnimationSettings(features),
      data: numberOfEquipments,
    },
    {
      label: "Number of uploads",
      icon: getAnimationSettings(uploads),
      data: numberOfUploads,
    },
    {
      label: "Last upload data",
      icon: getAnimationSettings(last_upload),
      data: lastUpload,
    },
    {
      label: "Number of activities",
      icon: getAnimationSettings(average),
      data: "14",
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
        <Grid item xs={12} style={{ marginBottom: "20px" }}>
          <Paper elevation={3} className={classes.paper}>
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
            >
              <Grid item xs={6}>
                <Paper component="form" className={classes.searchBarRoot}>
                  <InputBase
                    className={classes.inputSearchBar}
                    placeholder="Search uploads"
                    inputProps={{ "aria-label": "search google maps" }}
                  />
                  <IconButton
                    type="submit"
                    className={classes.iconButtonSearchBar}
                    aria-label="search"
                    style={{
                      color: ColorTheme.palette.primary.activeButtonText,
                    }}
                  >
                    <SearchIcon />
                  </IconButton>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Grid
                  container
                  direction="row"
                  justify="flex-end"
                  alignItems="center"
                >
                  <Tooltip title="Notification">
                    <Badge
                      badgeContent={4}
                      style={{
                        color: ColorTheme.palette.primary.activeButtonText,
                      }}
                    >
                      <IconButton size="small" edge="end">
                        <NotificationsIcon
                          aria-label="notification"
                          style={{
                            color: ColorTheme.palette.primary.activeButtonText,
                          }}
                        />
                      </IconButton>
                    </Badge>
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        {stats.map((data, index) => {
          return (
            <Grid
              key={index}
              item
              xs={12}
              sm={12}
              md={12}
              lg={2}
              xl={2}
              className={classes.gridItem}
            >
              <Paper className={classes.stats} elevation={3}>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    <Lottie options={data.icon} height={80} width={80} />
                  </Typography>
                  <Paper
                    style={{ width: "100%", height: "50px", marginTop: 10 }}
                    elevation={0}
                  >
                    <Typography className={classes.title} gutterBottom>
                      {data.label}
                    </Typography>
                  </Paper>
                </CardContent>
                <CardActions className={classes.cardContent}>
                  <Paper className={classes.dataStats} elevation={5}>
                    <Typography className={classes.numbers} gutterBottom>
                      {data.data}
                    </Typography>
                  </Paper>
                </CardActions>
              </Paper>
            </Grid>
          );
        })}
        <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
          <Paper elevation={3} className={classes.paper}>
            <Lottie
              options={
                downloadAnimation
                  ? getAnimationSettings(download, false)
                  : getAnimationSettings(empty)
              }
              height={75}
              width={80}
            />
            <Typography
              className={classes.title}
              gutterBottom
              style={{ marginTop: "20px" }}
            >
              {downloads.length && animationComplete
                ? downloads.map((data, index) => {
                    return (
                      <Typography
                        key={index}
                        variant="subtitle1"
                        gutterBottom
                        style={{ textAlign: "left" }}
                      >
                        {index + 1}. {data}
                      </Typography>
                    );
                  })
                : downloads.length
                ? "Updating recent downloads..."
                : "No recent downloads"}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} style={{ marginTop: "50px" }}>
          <Paper elevation={3} style={{ maxHeight: 500, overflow: "auto" }}>
            <CollapsibleTable
              setActive={setActiveDownloadHelper}
              downloads={downloads}
              setDownloads={setDownloads}
            />
          </Paper>
        </Grid>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleAlertClose}
        >
          <Alert
            onClose={handleAlertClose}
            severity="success"
            action={
              <Button color="inherit" size="small" onClick={handleAlertClose}>
                OK
              </Button>
            }
          >
            Press to confirm your download!
          </Alert>
        </Snackbar>
      </Grid>
    </>
  );
};
