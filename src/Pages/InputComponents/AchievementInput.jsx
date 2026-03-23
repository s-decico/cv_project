import React from "react";
import { WhiteTextField, WhiteDeleteIcon } from "../../MUIStyledComponents";
import { STRINGS } from "../../Constants/strings";

function AchievementInput({ handleAchievementChange, index, value, handleAchievementDelete }) {
  return (
    <div className="achivementsub">
      <div className="achievementFields">
        <WhiteTextField
          label={STRINGS.LABELS.ACHIEVEMENT_TITLE}
          variant="outlined"
          type="text"
          name="title"
          value={value ? value.title : ""}
          onChange={(event) => handleAchievementChange(event, index)}
        />
        <WhiteTextField
          label={STRINGS.LABELS.ACHIEVEMENT_SUBTITLE}
          variant="outlined"
          type="text"
          name="subtitle"
          value={value ? value.subtitle : ""}
          onChange={(event) => handleAchievementChange(event, index)}
        />
      </div>
      <div className="inlineDeleteBtn" onClick={() => handleAchievementDelete(index)}>
        <WhiteDeleteIcon />
      </div>
    </div>
  );
}

export default AchievementInput;
