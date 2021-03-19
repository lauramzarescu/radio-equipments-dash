import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";

import ColorTheme from "../Theme/ThemeProvider";

const useStyles = makeStyles((theme) => ({
    gridContainer: {
        backgroundColor: ColorTheme.palette.primary.main,
    }
}));

export const Equipments = () => {
  const classes = useStyles();

  return (
    <>
      <Grid container className={classes.gridContainer} xs={8}>
      
      </Grid>
    </>
  );
};
