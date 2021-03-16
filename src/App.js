import './App.css';
import { Sidebar } from './Components/Sidebar';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import RadioOutlinedIcon from '@material-ui/icons/RadioOutlined';
import UpdateOutlinedIcon from '@material-ui/icons/UpdateOutlined';

import {
  Paper,
  Grid,
  Button,
  ButtonGroup
} from '@material-ui/core';

const colortheme = createMuiTheme({
  palette: {
    primary: { main: "#fff", contrastText: "#fff" },
    secondary: { main: "#03a9f4", contrastText: "#fff" }
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
  },
});

function App() {
  return (
    <MuiThemeProvider theme={colortheme}>
      <div className="App">
        <Grid container className="main-container">
          <Grid container className="sidebar-container" xs={3}>
            <Sidebar width={250} height={"100%"}>
              <Paper className="paper-logo" variant="outlined" square />
              <ButtonGroup
                orientation="vertical"
                color="primary"
                size="large"
                aria-label="vertical contained button group"
                className="button-group">
                <Button className="btn" variant="text" startIcon={<DashboardOutlinedIcon />} style={{justifyContent: "flex-start"}}>
                  Dashboard
                            </Button>
                <Button className="btn" variant="text" startIcon={<RadioOutlinedIcon />} style={{justifyContent: "flex-start"}}>
                  Equipments
                            </Button>
                <Button className="btn" variant="text" startIcon={<UpdateOutlinedIcon />} style={{justifyContent: "flex-start"}}>
                  Updates
                            </Button>
              </ButtonGroup>

            </Sidebar>
          </Grid>
          <Grid item xs={8}>
            <Grid container justify="center" spacing={5}>
              {[0, 1, 2].map((value) => (
                <Grid key={value} item>
                  <Paper className="paper" />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
