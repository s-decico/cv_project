import React from "react";
import { WhiteTextField, WhiteDeleteIcon } from "../../MUIStyledComponents";

function EducationInput({ handleEducationChange, index, value, handleEducationDelete }) {
  return (
    <div className="educationSub">
      <div className="educationFields">
        <WhiteTextField
          label="Qualification"
          variant="outlined"
          type="text"
          name="qualification"
          value={value ? value.qualification : ""}
          onChange={(event) => handleEducationChange(event, index)}
        />
        <WhiteTextField
          label="School / College"
          variant="outlined"
          type="text"
          name="school"
          value={value ? value.school : ""}
          onChange={(event) => handleEducationChange(event, index)}
        />
        <WhiteTextField
          label="Year / Period"
          variant="outlined"
          type="text"
          name="doj"
          value={value ? value.doj : ""}
          onChange={(event) => handleEducationChange(event, index)}
        />
      </div>
      <div className="inlineDeleteBtn" onClick={() => handleEducationDelete(index)}>
        <WhiteDeleteIcon />
      </div>
    </div>
  );
}

export default EducationInput;
