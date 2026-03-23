import React, { useState, useEffect } from "react";
import { Tooltip, Checkbox, FormControlLabel } from "@mui/material";
import { WhiteTextField } from "../../MUIStyledComponents";
import { STRINGS } from "../../Constants/strings";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { Add } from "@mui/icons-material";

function WorkExperienceInput({
  index,
  setworkExperienceObj,
  workExperienceObj,
  value,
  handleWorkExpDelete,
  errors,
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
          label={STRINGS.LABELS.DESIGNATION}
          variant="outlined"
          type="text"
          name="designation"
          value={value?.designation || ""}
          onChange={(event) => handleWorkExpChange(event, index)}
          error={!!errors?.designation}
          helperText={errors?.designation}
        />
        <WhiteTextField
          label={STRINGS.LABELS.COMPANY_NAME}
          variant="outlined"
          type="text"
          name="companyname"
          value={value?.companyname || ""}
          onChange={(event) => handleWorkExpChange(event, index)}
          sx={{ marginTop: "0.5rem" }}
          error={!!errors?.companyname}
          helperText={errors?.companyname}
        />
        <div className="workExpDate">
          <WhiteTextField
            label={STRINGS.LABELS.START_DATE}
            variant="outlined"
            type={value?.startdate ? "date" : "text"}
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => {
              if (!e.target.value) e.target.type = "text";
            }}
            name="startdate"
            value={value?.startdate || ""}
            onChange={(event) => handleWorkExpChange(event)}
            sx={{ marginTop: "0.5rem", flex: 1 }}
            error={!!errors?.startdate}
            helperText={errors?.startdate}
          />
          <div style={{ display: "flex", flexDirection: "column", marginTop: "0.5rem", flex: 1, minWidth: 0 }}>
              <Tooltip title={STRINGS.LABELS.LEAVE_EMPTY} placement="top">
              <span>
                <WhiteTextField
                  label={STRINGS.LABELS.END_DATE}
                  variant="outlined"
                  type={value?.enddate ? "date" : "text"}
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => {
                    if (!e.target.value) e.target.type = "text";
                  }}
                  name="enddate"
                  value={value?.enddate || ""}
                  onChange={(event) => handleWorkExpChange(event)}
                  disabled={!!value?.startdate && !value?.enddate}
                  sx={{ 
                    width: "100%", 
                    opacity: (value?.startdate && !value?.enddate) ? 0.4 : 1,
                    pointerEvents: (value?.startdate && !value?.enddate) ? "none" : "auto" 
                  }}
                />
              </span>
            </Tooltip>
            <FormControlLabel
              control={
                <Checkbox
                  checked={!!value?.startdate && !value?.enddate}
                  onChange={(e) => {
                    if (e.target.checked) {
                      handleWorkExpChange({ target: { name: "enddate", value: "" } });
                    }
                  }}
                  sx={{
                    color: "rgba(124, 106, 247, 0.6)",
                    "&.Mui-checked": { color: "#a78bfa" },
                  }}
                />
              }
              label={
                <span style={{ color: "#f0f0ff", fontSize: "0.85rem", opacity: 0.85, whiteSpace: "nowrap" }}>
                  {STRINGS.LABELS.CURRENT_JOB}
                </span>
              }
              sx={{ marginTop: "0.25rem", userSelect: "none", marginLeft: 0 }}
            />
          </div>
        </div>
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

export default WorkExperienceInput;
