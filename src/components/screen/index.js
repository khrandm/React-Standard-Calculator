import React, { useRef, useLayoutEffect, useState } from "react";
import { makeStyles, Typography, Box } from "@material-ui/core";
import { useSelector } from "react-redux";

import ScrollableComponent from "./scrollableComponent";

const useStyle = makeStyles({
  screen: {
    height: "30%",
    userSelect: "none"
  },
  box: {
    height: "100%",
    padding: 10,
    border: "1px solid #b6b6b6"
  },

  equation: {
    overflow: "hidden",

    display: "flex",
    height: "30%",
    flexDirection: "row-reverse",
    alignItems: "center",
    color: "#757575",
    whiteSpace: "nowrap",
    letterSpacing: 1
  },
  entry: {
    display: "flex",
    height: "70%",
    justifyContent: "flex-end",
    alignItems: "center",
    whiteSpace: "nowrap"
  },
  text: {
    fontSize: ({ fontSize }) => fontSize
  }
});

const Screen = () => {
  const equation = useSelector(state => state.calculator.equation);
  const entry = useSelector(state => state.calculator.entry);

  const [fontSize, setFontSize] = useState();
  const classes = useStyle({ fontSize });
  const containerRef = useRef();
  const entryRef = useRef();

  useLayoutEffect(() => {
    const fontSize = parseFloat(
      window.getComputedStyle(entryRef.current).getPropertyValue("font-size")
    );
    const text = {
      width: entryRef.current.offsetWidth,
      height: entryRef.current.offsetHeight
    };
    const container = {
      width: containerRef.current.offsetWidth,
      height: containerRef.current.offsetHeight
    };

    const widthPercentage = text.width / entry.length / fontSize;
    const heightPercentage = text.height / fontSize;
    const resize = () => {
      return container.width / entry.length / widthPercentage;
    };
    if (text.height < container.height) {
      const size = resize();

      if (size * heightPercentage > container.height) {
        const fontSize = container.height / heightPercentage;
        setFontSize(fontSize);
      } else {
        setFontSize(resize());
      }
    } else if (text.width > container.width) {
      setFontSize(resize());
    }
  }, [entry, fontSize]);

  return (
    <div className={classes.screen}>
      <Box className={classes.box} borderRadius={5}>
        <ScrollableComponent className={classes.equation}>
          <Typography variant="h5">{equation}</Typography>
        </ScrollableComponent>

        <span className={classes.entry} ref={containerRef}>
          <Typography className={classes.text} ref={entryRef}>
            {entry}
          </Typography>
        </span>
      </Box>
    </div>
  );
};

export default Screen;
