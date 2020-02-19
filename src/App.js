import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Screen from "./components/screen";
import Keypad from "./components/keypad";

const useStyles = makeStyles({
  "@global": {
    "html, body, #root": {
      height: "100%"
    }
  },

  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    minHeight: 700,
    minWidth: 400
  },
  container: {
    height: 600
  },
  paper: {
    height: "100%",
    padding: 10
  }
});

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff"
    },
    secondary: {
      light: "#ff5131",
      main: "#d50000",
      dark: "#9b0000",
      contrastText: "#ffffff"
    }
  }
});

function App() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className={classes.root}>
          <Container className={classes.container} maxWidth="xs">
            <Paper className={classes.paper} elevation={5}>
              <Screen></Screen>
              <Keypad></Keypad>
            </Paper>
          </Container>
        </div>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
