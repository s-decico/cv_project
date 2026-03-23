import React, { useState } from "react";
import { WhiteTextField } from "../../MUIStyledComponents";
import "../cv.css";

function SkillsInput({ skills, setSkills }) {
  const [inputValue, setInputValue] = useState("");

  const handleSkillDelete = (index) => {
    const temp = [...skills];
    temp.splice(index, 1);
    setSkills(temp);
  };

  const handleAdd = () => {
    const trimmed = inputValue.trim();
    if (trimmed) {
      setSkills([...skills, trimmed]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="skillLangIntMain">
      <div className="skillLangIntTitle">⚡ Skills</div>
      <div className="skillLangIntInput">
        <WhiteTextField
          label="Add a skill"
          variant="outlined"
          size="small"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="addChipBtn" onClick={handleAdd} type="button">
          + Add
        </button>
      </div>
      {skills.length > 0 && (
        <div className="skillLangIntdisplay">
          {skills.map((x, index) => (
            <div key={index} className="skillChip">
              <span>{x}</span>
              <button
                className="chipDeleteBtn"
                onClick={() => handleSkillDelete(index)}
                type="button"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SkillsInput;
