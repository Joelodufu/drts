import React from "react";
import {
  RadioGroup,
  InputLabel,
  FormControl,
  FormControlLabel,
  Radio,
  FormLabel,
  Button,
} from "@mui/material";
export default function radioGroup(props) {
  const { name, label, value, onChange, items } = props;
  return (
    <FormControl>
      <FormLabel id="demo-gender-label">{label}</FormLabel>
      <RadioGroup row name={name} value={value} onChange={onChange}>
        {items.map((item, index) => (
          <FormControlLabel
            key={index}
            value={item.id}
            control={<Radio />}
            label={item.title}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
