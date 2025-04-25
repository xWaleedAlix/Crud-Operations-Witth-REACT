import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect } from "react";
const options = ["Low", "Medium", "High"];

export default function SetPriority({PriorityRef}) {
  const [value, setValue] = React.useState(options[1]);
  React.useEffect(()=>{
    PriorityRef.current=value;

  },[value])
  return (
    <div>
      <Autocomplete
        className={`rounded innerWhite innerSVG  ${
          value === "Low" ? "bg-blue-500" : value === "Medium" ? "bg-amber-500" : value === "High" ? "bg-red-500" : "sad"
        }`}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        options={options}
        disableClearable
        sx={{ width: 120, marginRight: 1, color: "white !important",border:0}}
        renderInput={(params) => <TextField {...params} label="" />}
      />
    </div>
  );
}
