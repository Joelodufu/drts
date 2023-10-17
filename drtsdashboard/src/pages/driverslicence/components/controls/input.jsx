import { TextField } from "@mui/material";
import React from "react";

export default function Input(props) {
  const { name, label, value, handleInput, ...others } = props;

  return (
    <TextField
      required
      label={label}
      name={name}
      value={value}
      onChange={handleInput}
      {...others}
    />
  );
}
