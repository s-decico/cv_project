import React from "react";
import { WhiteTextField, WhiteDeleteIcon } from "../../MUIStyledComponents";
import { STRINGS } from "../../Constants/strings";

function EducationInput({ handleEducationChange, index, value, handleEducationDelete, errors }) {
  return (
    <div className="educationSub">
      <div className="educationFields">
        <WhiteTextField
          label={STRINGS.LABELS.QUALIFICATION}
          variant="outlined"
          type="text"
          name="qualification"
          value={value?.qualification || ""}
          onChange={(event) => handleEducationChange(event, index)}
          error={!!errors?.qualification}
          helperText={errors?.qualification}
        />
        <WhiteTextField
          label={STRINGS.LABELS.SCHOOL}
          variant="outlined"
          type="text"
          name="school"
          value={value?.school || ""}
          onChange={(event) => handleEducationChange(event, index)}
          error={!!errors?.school}
          helperText={errors?.school}
        />
        <WhiteTextField
          label={STRINGS.LABELS.YEAR_PERIOD}
          variant="outlined"
          type={value?.doj ? "month" : "text"}
          onFocus={(e) => (e.target.type = "month")}
          onBlur={(e) => {
            if (!e.target.value) e.target.type = "text";
          }}
          name="doj"
          value={value?.doj || ""}
          onChange={(event) => handleEducationChange(event, index)}
          error={!!errors?.doj}
          helperText={errors?.doj}
        />
      </div>
      <div className="inlineDeleteBtn" onClick={() => handleEducationDelete(index)}>
        <WhiteDeleteIcon />
      </div>
    </div>
  );
}

export default EducationInput;
