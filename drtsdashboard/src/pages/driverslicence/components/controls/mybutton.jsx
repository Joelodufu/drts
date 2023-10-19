import React from "react";
import { Button } from "@mui/material/";
import { makeStyles } from "@mui/styles";
const useStyle = makeStyles((theme) => ({
  root: {
    margin: "10px",
  },
  label: {
    textTransform: "none",
  },
}));
export default function MyButton(props) {
  const classes = useStyle();
  const { text, size, color, variant, onClick, ...other } = props;
  return (
    <Button
      variant={variant || "contained"}
      size={size || "large"}
      color={color || "primary"}
      onClick={onClick}
      {...other}
      className={classes.label}
    >
      {text}
    </Button>
  );
}
