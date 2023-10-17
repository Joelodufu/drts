import React from "react";
import { Button } from "@mui/material/";

export default function MyButton(props) {
  const { text, size, color, variant, onClick, ...other } = props;
  return (
    <Button
      variant={variant || "contained"}
      size={size || "large"}
      color={color || "primary"}
      onClick={onClick}
      {...other}
    >
      {text}
    </Button>
  );
}
