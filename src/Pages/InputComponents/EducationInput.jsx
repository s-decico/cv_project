import React from "react";
import { TextField, Button } from "@mui/material";
import {
  WhiteTextField,
  GradientButton,
  WhiteDeleteIcon,
} from "../../MUIStyledComponents";
import IconButton from "@mui/material/IconButton";
import { Delete } from "@mui/icons-material";

function EducationInput({
  handleEducationChange,
  index,
  value,
  handleEducationDelete,
}) {
  return (
    <>
      <div className="educationSub">
        <WhiteTextField
          id="outlined-basic"
          label="Qualification"
          variant="outlined"
          type="text"
          name="qualification"
          value={value ? value.qualification : ""}
          onChange={(event) => {
            handleEducationChange(event, index);
          }}
        />

        <WhiteTextField
          id="outlined-basic"
          label="School/College"
          variant="outlined"
          type="text"
          name="school"
          value={value ? value.school : ""}
          onChange={(event) => {
            handleEducationChange(event, index);
          }}
        />

        <WhiteTextField
          id="outlined-basic"
          label="Date of joining"
          variant="outlined"
          type="text"
          name="doj"
          value={value ? value.doj : ""}
          onChange={(event) => {
            handleEducationChange(event, index);
          }}
        />
        <div className="workexpprojdelete">
          <IconButton
            aria-label="delete"
            onClick={() => handleEducationDelete(index)}
          >
            <WhiteDeleteIcon />
          </IconButton>
        </div>
      </div>
    </>
  );
}

export default EducationInput;
