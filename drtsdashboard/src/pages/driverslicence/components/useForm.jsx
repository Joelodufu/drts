import React, { useState } from "react";
import { makeStyles } from "@mui/styles";

export function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const handleInput = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return {
    values,
    setValues,
    handleInput,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: "10px",
    },
  },
}));

export function Form(props) {
  const classes = useStyles();
  const { children, ...others } = props;

  return (
    <form {...others} className={classes.root}>
      {props.children}
    </form>
  );
}
