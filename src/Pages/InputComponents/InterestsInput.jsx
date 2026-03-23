import React, { useState } from "react";
import { WhiteTextField } from "../../MUIStyledComponents";
import "../cv.css";

function InterestsInput({ interests, setInterests }) {
  const [inputValue, setInputValue] = useState("");

  const handleInterestDelete = (index) => {
    const temp = [...interests];
    temp.splice(index, 1);
    setInterests(temp);
  };

  const handleAdd = () => {
    const trimmed = inputValue.trim();
    if (trimmed) {
      setInterests([...interests, trimmed]);
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
      <div className="skillLangIntTitle">✨ Interests</div>
      <div className="skillLangIntInput">
        <WhiteTextField
          label="Add an interest"
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
      {interests.length > 0 && (
        <div className="skillLangIntdisplay">
          {interests.map((x, index) => (
            <div key={index} className="skillChip">
              <span>{x}</span>
              <button
                className="chipDeleteBtn"
                onClick={() => handleInterestDelete(index)}
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

export default InterestsInput;
