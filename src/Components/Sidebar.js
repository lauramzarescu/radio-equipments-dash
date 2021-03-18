import React, { useState, useEffect } from "react";
import "../styles/Sidebar.css";

import ColorTheme from "../Theme/ThemeProvider";
import { withStyles, makeStyles } from "@material-ui/core/styles";

import { Paper, Button, IconButton } from "@material-ui/core";

import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import RadioOutlinedIcon from "@material-ui/icons/RadioOutlined";
import PublishOutlinedIcon from "@material-ui/icons/PublishOutlined";
import AssessmentOutlinedIcon from "@material-ui/icons/AssessmentOutlined";

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.primary.sidebarText,
    fontWeight: "bold",
    lineHeight: "30px",
    fontSize: 12,
    width: "100%",
    borderRadius: 0,
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  button: {
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  },
  activeButton: {
    borderRightWidth: 3,
    borderRightStyle: "solid",
    borderRightColor: theme.palette.primary.activeBorder,
    background: theme.palette.primary.activeButton,
    color: theme.palette.primary.activeButtonText,
    "&:hover": {
      borderRightWidth: 3,
      borderRightStyle: "solid",
      borderRightColor: theme.palette.primary.activeBorder,
      background: theme.palette.primary.activeButton,
      color: theme.palette.primary.activeButtonText,
    },
  },
}));

export const Sidebar = () => {
  const classes = useStyles();

  const [active, setActive] = useState([true, false, false]);

  function SidebarButtons() {
    const buttons = [
      {
        name: "Dashboard",
        icon: <DashboardOutlinedIcon />,
      },
      {
        name: "Equipments",
        icon: <RadioOutlinedIcon />,
      },
      {
        name: "Upload data",
        icon: <PublishOutlinedIcon />,
      },
    ];

    function persistentFocusButton(index) {
        const activeArr = active.map((val, i) => val ? !val : val);
        activeArr[index] = !activeArr[index];
        setActive([...activeArr]);
        console.log(activeArr)
      }

    const listButtons = buttons.map((button, index) => (
      <ColorButton
        key={index}
        className={active[index] ? classes.activeButton : null}
        startIcon={button.icon}
        onClick={() => persistentFocusButton(index)}
      >
        {button.name}
      </ColorButton>
    ));

    return listButtons;
  }

  return (
    <>
      <Paper
        className="sidebar-paper"
        style={{ backgroundColor: ColorTheme.palette.primary.main }}
        elevation={2}
      >
        <IconButton
          aria-label="logo"
          disableRipple={true}
          disableFocusRipple={true}
          className={classes.button}
        >
          <AssessmentOutlinedIcon
            style={{ fontSize: "4rem", width: "100%", margin: "15px 0 15px 0" }}
          />
        </IconButton>
        <SidebarButtons />
      </Paper>
    </>
  );
};
