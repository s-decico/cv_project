import React, { useState, useEffect } from "react";
import { Tooltip } from "@mui/material";
import { WhiteTextField } from "../../MUIStyledComponents";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { Add } from "@mui/icons-material";

function WorkExperienceInput({
  index,
  setworkExperienceObj,
  workExperienceObj,
  value,
  handleWorkExpDelete,
}) {
  const [_details, setDetails] = useState([]);

  useEffect(() => {
    if (value && value.details && Array.isArray(value.details)) {
      setDetails([...value.details]);
    } else {
      setDetails([]);
    }
  }, [value, index]);

  const handleWorkExpChange = (event, __details) => {
    const { name, value } = event.target;
    const updatedWorkExpObj = [...workExperienceObj];
    const workexpObjtemp = updatedWorkExpObj[index] || {};
    if (name === "details") workexpObjtemp[name] = __details;
    else workexpObjtemp[name] = value;
    updatedWorkExpObj[index] = workexpObjtemp;
    setworkExperienceObj(updatedWorkExpObj);
  };

  const handleAdd = () => {
    const temp = [..._details, ""];
    setDetails(temp);
  };

  const handleDetailsChange = (e, i) => {
    const tempdetails = [..._details];
    tempdetails[i] = e.target.value;
    setDetails(tempdetails);
    handleWorkExpChange(e, tempdetails);
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
          label="Designation"
          variant="outlined"
          type="text"
          name="designation"
          value={value ? value.designation : ""}
          onChange={(event) => handleWorkExpChange(event, index)}
        />
        <WhiteTextField
          label="Company Name"
          variant="outlined"
          type="text"
          name="companyname"
          value={value ? value.companyname : ""}
          onChange={(event) => handleWorkExpChange(event, index)}
          sx={{ marginTop: "0.5rem" }}
        />
        <div className="workExpDate">
          <WhiteTextField
            label="Date of Joining"
            variant="outlined"
            type="text"
            name="startdate"
            value={value ? value.startdate : ""}
            onChange={(event) => handleWorkExpChange(event)}
            sx={{ marginTop: "0.5rem" }}
          />
          <Tooltip title="Leave empty if still working" placement="top">
            <WhiteTextField
              label="End Date"
              variant="outlined"
              type="text"
              name="enddate"
              value={value ? value.enddate : ""}
              onChange={(event) => handleWorkExpChange(event)}
              sx={{ marginTop: "0.5rem" }}
            />
          </Tooltip>
        </div>
      </div>

      {/* Right column: bullet details */}
      <div className="detailsMain">
        <div className="detailsHead">
          Bullet Points
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
          <p className="detailsEmptyHint">Click + to add bullet points.</p>
        )}
      </div>
    </div>
  );
}

export default WorkExperienceInput;
