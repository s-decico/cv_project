import React, { useState, useEffect } from "react";
import { Tooltip } from "@mui/material";
import { WhiteTextField } from "../../MUIStyledComponents";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { Add } from "@mui/icons-material";
import { STRINGS } from "../../Constants/strings";

function ProjectsInput({ index, setProjectObj, projectObj, value, handleProjDelete, errors }) {
  const [_details, setDetails] = useState([]);

  useEffect(() => {
    if (value && value.details && Array.isArray(value.details)) {
      setDetails([...value.details]);
    } else {
      setDetails([]);
    }
  }, [value, index]);

  const handleProjectChange = (event, __details) => {
    const { name, value } = event.target;
    const updatedProjObj = [...projectObj];
    const projObjtemp = updatedProjObj[index] || {};
    if (name === "details") projObjtemp[name] = __details;
    else projObjtemp[name] = value;
    updatedProjObj[index] = projObjtemp;
    setProjectObj(updatedProjObj);
  };

  const handleAdd = () => {
    const temp = [..._details, ""];
    setDetails(temp);
  };

  const handleDetailsChange = (e, i) => {
    const tempdetails = [..._details];
    tempdetails[i] = e.target.value;
    setDetails(tempdetails);
    handleProjectChange(e, tempdetails);
  };

  const handleDetailsDelete = (detailIndex) => {
    const temp = [..._details];
    temp.splice(detailIndex, 1);
    setDetails(temp);
  };

  return (
    <div className="workExperienceProjSub">
      {/* Left column: fields */}
      <div className="workExperienceProjTitle">
        <WhiteTextField
          label={STRINGS.LABELS.PROJECT_NAME}
          variant="outlined"
          type="text"
          name="projectname"
          value={value?.projectname || ""}
          onChange={(event) => handleProjectChange(event)}
          error={!!errors?.projectname}
          helperText={errors?.projectname}
        />
        <WhiteTextField
          label={STRINGS.LABELS.PROJECT_YEAR}
          variant="outlined"
          type={value?.projectyear ? "month" : "text"}
          onFocus={(e) => (e.target.type = "month")}
          onBlur={(e) => {
            if (!e.target.value) e.target.type = "text";
          }}
          name="projectyear"
          value={value?.projectyear || ""}
          onChange={(event) => handleProjectChange(event)}
          sx={{ marginTop: "0.5rem" }}
          error={!!errors?.projectyear}
          helperText={errors?.projectyear}
        />
        <Tooltip title="Enter the URL of the project" placement="top">
          <WhiteTextField
            label={STRINGS.LABELS.PROJECT_LINK}
            variant="outlined"
            type="text"
            name="projectlink"
            value={value?.projectlink || ""}
            onChange={(event) => handleProjectChange(event)}
            sx={{ marginTop: "0.5rem" }}
            error={!!errors?.projectlink}
            helperText={errors?.projectlink}
          />
        </Tooltip>
      </div>

      {/* Right column: bullet details */}
      <div className="detailsMain">
        <div className="detailsHead">
          {STRINGS.LABELS.BULLET_POINTS}
          <IconButton
            aria-label="add"
            size="small"
            onClick={handleAdd}
            sx={{ color: "#a78bfa", "&:hover": { background: "rgba(124,106,247,0.1)" } }}
          >
            <Add fontSize="small" />
          </IconButton>
        </div>
        {_details.map((obj, i) => (
          <div key={i} className="detailUnit">
            <WhiteTextField
              label={`Point ${i + 1}`}
              variant="standard"
              type="text"
              name="details"
              value={_details[i] || ""}
              onChange={(e) => handleDetailsChange(e, i)}
              sx={{ flex: 1 }}
            />
            <IconButton
              aria-label="delete"
              size="small"
              onClick={() => handleDetailsDelete(i)}
              sx={{ color: "#f87171", "&:hover": { background: "rgba(239,68,68,0.1)" } }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </div>
        ))}
        {_details.length === 0 && (
          <p className="detailsEmptyHint">{STRINGS.LABELS.CLICK_TO_ADD}</p>
        )}
      </div>
    </div>
  );
}

export default ProjectsInput;
