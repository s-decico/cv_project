import React, { useState } from "react";
import { WhiteTextField } from "../../MUIStyledComponents";
import "../cv.css";

function LanguageInput({ language, setLanguage }) {
  const [inputValue, setInputValue] = useState("");

  const handlelangDelete = (index) => {
    const temp = [...language];
    temp.splice(index, 1);
    setLanguage(temp);
  };

  const handleAdd = () => {
    const trimmed = inputValue.trim();
    if (trimmed) {
      setLanguage([...language, trimmed]);
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
      <div className="skillLangIntTitle">🌐 Languages</div>
      <div className="skillLangIntInput">
        <WhiteTextField
          label="Add a language"
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
      {language.length > 0 && (
        <div className="skillLangIntdisplay">
          {language.map((x, index) => (
            <div key={index} className="skillChip">
              <span>{x}</span>
              <button
                className="chipDeleteBtn"
                onClick={() => handlelangDelete(index)}
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

export default LanguageInput;
