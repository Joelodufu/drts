import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FormControl, InputLabel } from "@mui/material";

export default function PickDate(props) {
  const { name, label, value, onChange, ...others } = props;

  const convertToDefEventParams = (name, value) => ({
    target: {
      name,
      value,
    },
  });
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label={label}
          name={name}
          value={value}
          onChange={(date) => onChange(convertToDefEventParams(name, date))}
          {...others}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
