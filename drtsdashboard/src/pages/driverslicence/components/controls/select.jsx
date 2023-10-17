import {
  FormControl,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import React from "react";

export default function MySelect(props) {
  const { name, label, value, onChange, options } = props;
  return (
    <FormControl variant="outlined">
      <InputLabel>{label}</InputLabel>
      <Select label={label} name={name} value={value} onChange={onChange}>
        {options.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
