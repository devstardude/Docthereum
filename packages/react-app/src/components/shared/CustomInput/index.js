import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { useField } from "formik";

import "./style.css";

const CustomInput = (props) => {
  const [field, meta] = useField(props);
   const textFieldColor = "#0ac5a8";
    const textFieldSX = {
        input: {
            "-webkit-text-fill-color": `${textFieldColor} !important`,
            color: `${textFieldColor} !important`,
        },
    };
  return (
    <div className="m-3 py-2">
      <TextField
        {...props}
        {...field}
        defaultValue="Success"
        fullWidth
        error={meta.touched && meta.error ? meta.error : false}
        id={props.name}
        label={props.label}
        helperText={meta.error}
        multiline={props.multiline && true}
        InputLabelProps={{
          style: { color: "#0ac5a8", borderColor: "yellow" },
        }}
        sx={textFieldSX}
        InputProps={{
          style: {
            fontFamily: "Lato",
            color: "#0ac5a8",
            borderColor: "yellow",
          },
        }}
        type={props.password && "password"}
        disabled={props.disabled && true}
      />
    </div>
  );
};

export default CustomInput;
