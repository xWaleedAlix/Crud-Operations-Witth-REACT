import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function DropMenu({
  categoryRef,
  para,
  setFilterCategory,
  filterByCategory,
}) {
  const handleChange = (e, value) => {
    filterByCategory(value || "");
  };

  return (
    <Autocomplete
      disablePortal
      options={["Work", "Personal", "Urgent"]}
      onChange={handleChange}
      sx={{ width: 200 }}
      renderInput={(params) => <TextField {...params} label="Category" />}
    />
  );
}
