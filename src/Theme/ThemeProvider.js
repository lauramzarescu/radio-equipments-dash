import { orange } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

const ColorTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#fff",
      activeButtonText: "#fd7a38",
      contrastText: "#fff",
      activeBorder: "#fd7a38",
      activeButton:
        "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,248,244,1) 42%, rgba(255,239,232,1) 100%);",
    },
    secondary: {
      main: "#f7f6f4",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: "Montserrat, sans-serif",
  },
});

export default ColorTheme;
