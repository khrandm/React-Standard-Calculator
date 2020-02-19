import React from "react";
import { Grid, Button, makeStyles } from "@material-ui/core";
import { entry, del, clear, decimal, operation, equals } from "../../actions";
import { useDispatch } from "react-redux";

const useStyles = makeStyles({
  keypad: {
    paddingTop: 5,
    height: "70%"
  },
  numpad: {
    height: "100%"
  },
  buttonContainer: {
    padding: 5
  },
  button: {
    height: "100%",
    fontSize: 20
  },
  equals: {
    color: "#262020",
    backgroundColor: "#8b8c97",
    "&:hover": {
      backgroundColor: "#a3a4ac"
    }
  },
  delete: {
    backgroundColor: "#c72a2a",
    "&:hover": {
      backgroundColor: "#e54e4e"
    }
  },
  operation: {
    backgroundColor: "#666666",
    "&:hover": {
      backgroundColor: "grey"
    }
  }
});
const Keypad = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const entryHandler = value => {
    dispatch(entry(value));
  };

  return (
    <Grid className={classes.keypad} container direction="row">
      <Grid item xs={9}>
        <Grid
          className={classes.numpad}
          container
          direction="row"
          justify="center"
          alignItems="stretch"
        >
          <Grid className={classes.buttonContainer} item xs={4}>
            <Button
              className={classes.button}
              variant="contained"
              fullWidth={true}
              onClick={() => entryHandler("7")}
            >
              7
            </Button>
          </Grid>
          <Grid className={classes.buttonContainer} item xs={4}>
            <Button
              className={classes.button}
              variant="contained"
              fullWidth={true}
              onClick={() => entryHandler("8")}
            >
              8
            </Button>
          </Grid>
          <Grid className={classes.buttonContainer} item xs={4}>
            <Button
              className={classes.button}
              variant="contained"
              fullWidth={true}
              onClick={() => entryHandler("9")}
            >
              9
            </Button>
          </Grid>
          <Grid className={classes.buttonContainer} item xs={4}>
            <Button
              className={classes.button}
              variant="contained"
              fullWidth={true}
              onClick={() => entryHandler("4")}
            >
              4
            </Button>
          </Grid>
          <Grid className={classes.buttonContainer} item xs={4}>
            <Button
              className={classes.button}
              variant="contained"
              fullWidth={true}
              onClick={() => entryHandler("5")}
            >
              5
            </Button>
          </Grid>
          <Grid className={classes.buttonContainer} item xs={4}>
            <Button
              className={classes.button}
              variant="contained"
              fullWidth={true}
              onClick={() => entryHandler("6")}
            >
              6
            </Button>
          </Grid>
          <Grid className={classes.buttonContainer} item xs={4}>
            <Button
              className={classes.button}
              variant="contained"
              fullWidth={true}
              onClick={() => entryHandler("1")}
            >
              1
            </Button>
          </Grid>
          <Grid className={classes.buttonContainer} item xs={4}>
            <Button
              className={classes.button}
              variant="contained"
              fullWidth={true}
              onClick={() => entryHandler("2")}
            >
              2
            </Button>
          </Grid>
          <Grid className={classes.buttonContainer} item xs={4}>
            <Button
              className={classes.button}
              variant="contained"
              fullWidth={true}
              onClick={() => entryHandler("3")}
            >
              3
            </Button>
          </Grid>
          <Grid className={classes.buttonContainer} item xs={4}>
            <Button
              className={classes.button}
              variant="contained"
              fullWidth={true}
              onClick={() => dispatch(decimal())}
            >
              .
            </Button>
          </Grid>
          <Grid className={classes.buttonContainer} item xs={4}>
            <Button
              className={classes.button}
              variant="contained"
              fullWidth={true}
              onClick={() => entryHandler("0")}
            >
              0
            </Button>
          </Grid>
          <Grid className={classes.buttonContainer} item xs={4}>
            <Button
              className={`${classes.button} ${classes.equals}`}
              color="primary"
              variant="contained"
              fullWidth={true}
              onClick={() => dispatch(equals())}
            >
              =
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={3}>
        <Grid className={classes.numpad} container direction="row" alignItems="stretch">
          <Grid className={classes.buttonContainer} item xs={12}>
            <Button
              className={`${classes.button} ${classes.delete}`}
              color="secondary"
              variant="contained"
              fullWidth={true}
              onClick={() => dispatch(del())}
            >
              DEL
            </Button>
          </Grid>

          <Grid className={classes.buttonContainer} item xs={12}>
            <Button
              className={`${classes.button} ${classes.delete}`}
              color="secondary"
              variant="contained"
              fullWidth={true}
              onClick={() => dispatch(clear())}
            >
              C
            </Button>
          </Grid>

          <Grid className={classes.buttonContainer} item xs={12}>
            <Button
              className={`${classes.button} ${classes.operation}`}
              color="primary"
              variant="contained"
              fullWidth={true}
              onClick={() => dispatch(operation("DIVIDE"))}
            >
              ÷
            </Button>
          </Grid>

          <Grid className={classes.buttonContainer} item xs={12}>
            <Button
              className={`${classes.button} ${classes.operation}`}
              color="primary"
              variant="contained"
              fullWidth={true}
              onClick={() => dispatch(operation("MULTIPLY"))}
            >
              x
            </Button>
          </Grid>

          <Grid className={classes.buttonContainer} item xs={12}>
            <Button
              className={`${classes.button} ${classes.operation}`}
              color="primary"
              variant="contained"
              fullWidth={true}
              onClick={() => dispatch(operation("SUBTRACT"))}
            >
              -
            </Button>
          </Grid>

          <Grid className={classes.buttonContainer} item xs={12}>
            <Button
              className={`${classes.button} ${classes.operation}`}
              color="primary"
              variant="contained"
              fullWidth={true}
              onClick={() => dispatch(operation("ADD"))}
            >
              +
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Keypad;
