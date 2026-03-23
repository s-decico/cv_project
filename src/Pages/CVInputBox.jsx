import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./cv.css";
import AchievementInput from "./InputComponents/AchievementInput";
import EducationInput from "./InputComponents/EducationInput";
import InterestsInput from "./InputComponents/InterestsInput";
import LanguageInput from "./InputComponents/LanguageInput";
import ProjectsInput from "./InputComponents/ProjectsInput";
import SkillsInput from "./InputComponents/SkillsInput";
import WorkExperienceInput from "./InputComponents/WorkExperienceInput";


import axios from "axios";
import cookie from "js-cookie";
import Navbar from "../Component/Navbar";
import {
  GradientButton,
  WhiteDeleteIcon,
} from "../MUIStyledComponents";
import UserDetailsInput from "./InputComponents/UserDetailsinput";

import LinearWithValueLabel from "../MUIComponents/LinearProgressBar";

function CVInputBox() {
  let jsonData = {};
  const navigate = useNavigate();
  const token = cookie.get("token");
  const isAuthenticated = cookie.get("isAuthenticated");

  useEffect(() => {
    if (token === null || token === undefined) {
      setTimeout(() => { navigate("/login"); }, 0);
    } else if (isAuthenticated && token) {
      setTimeout(() => {
        navigate("/cvinput");
        const url = process.env.REACT_APP_API_URL + "/fetchform";
        const fetchData = async () => {
          axios
            .get(url, {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/x-www-form-urlencoded",
              },
              withCredentials: true,
            })
            .then(function (res) {
              if (res.status === 200) {
                jsonData = res.data;
                if (jsonData != {}) {
                  if (Object.keys(jsonData.BasicDetails).length > 0) setUserDetails(jsonData.BasicDetails);
                  if (Object.keys(jsonData.WorkExperience).length > 0) setworkExperienceObj(jsonData.WorkExperience);
                  if (Object.keys(jsonData.Education).length > 0) setEducationObj(jsonData.Education);
                  if (Object.keys(jsonData.Project).length > 0) setProjectObj(jsonData.Project);
                  if (jsonData.Achievement.length > 0) setAchievementObj(jsonData.Achievement);
                  if (jsonData.Skills.length > 0) setSkills(jsonData.Skills);
                  if (jsonData.Language.length > 0) setLanguage(jsonData.Language);
                  if (jsonData.Interest.length > 0) setInterests(jsonData.Interest);
                }
              }
            })
            .catch(function (err) { console.log(err); });
        };
        fetchData();
      }, 0);
    }
  }, [token]);

  const [userDetails, setUserDetails] = useState({});
  const [fullDetails, setfullDetails] = useState();
  let tempobj = {};

  const [workExperienceObj, setworkExperienceObj] = useState([]);
  const [educationObj, setEducationObj] = useState([]);
  const [projectObj, setProjectObj] = useState([]);
  const [achievementObj, setAchievementObj] = useState([]);
  const [skills, setSkills] = useState([]);
  const [language, setLanguage] = useState([]);
  const [interests, setInterests] = useState([]);

  const renderWorkExperience = () => {
    setworkExperienceObj((prev) => [...prev, { designation: "", companyname: "", details: [] }]);
  };
  const renderEducation = () => {
    setEducationObj((prev) => [...prev, { qualification: "", school: "", doj: "" }]);
  };
  const renderProjects = () => {
    setProjectObj((prev) => [...prev, { projectname: "", projectyear: "", details: [] }]);
  };
  const renderAchievement = () => {
    setAchievementObj((prev) => [...prev, { title: "", subtitle: "" }]);
  };

  const handleUserDetails = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleEducationChange = (event, index) => {
    const { name, value } = event.target;
    const updated = [...educationObj];
    const temp = updated[index] || {};
    temp[name] = value;
    updated[index] = temp;
    setEducationObj(updated);
  };

  const handleAchievementChange = (event, index) => {
    const { name, value } = event.target;
    const updated = [...achievementObj];
    const temp = updated[index] || {};
    temp[name] = value;
    updated[index] = temp;
    setAchievementObj(updated);
  };

  const handleAchievementDelete = (index) => {
    const temp = [...achievementObj];
    temp.splice(index, 1);
    setAchievementObj(temp);
  };
  const handleProjDelete = (index) => {
    const temp = [...projectObj];
    temp.splice(index, 1);
    setProjectObj(temp);
  };
  const handleWorkExpDelete = (index) => {
    const temp = [...workExperienceObj];
    temp.splice(index, 1);
    setworkExperienceObj(temp);
  };
  const handleEducationDelete = (index) => {
    const temp = [...educationObj];
    temp.splice(index, 1);
    setEducationObj(temp);
  };

  const sendDataToServer = (data) => {
    const url = process.env.REACT_APP_API_URL + "/cvinput";
    axios
      .post(url, data, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then(function (res) { if (res.status === 200) navigate("/cv"); })
      .catch(function (err) { console.log(err); });
  };

  const handleFormSubmit = () => {
    // 1. Scrub everything that is entirely empty
    const cleanWork = workExperienceObj.filter(obj => 
      obj.designation?.trim() || obj.companyname?.trim() || obj.startdate?.trim() || obj.enddate?.trim() || obj.details?.some(d => typeof d === 'string' && d.trim())
    );
    cleanWork.forEach(obj => { obj.details = obj.details?.filter(d => typeof d === 'string' && d.trim()) || [] });

    const cleanEdu = educationObj.filter(obj => 
      obj.qualification?.trim() || obj.school?.trim() || obj.doj?.trim()
    );

    const cleanProj = projectObj.filter(obj => 
      obj.projectname?.trim() || obj.projectyear?.trim() || obj.projectlink?.trim() || obj.details?.some(d => typeof d === 'string' && d.trim())
    );
    cleanProj.forEach(obj => { obj.details = obj.details?.filter(d => typeof d === 'string' && d.trim()) || [] });

    const cleanAchieve = achievementObj.filter(obj => 
      obj.title?.trim() || obj.subtitle?.trim()
    );

    const cleanSkills = skills.filter(s => typeof s === 'string' && s.trim());
    const cleanLang = language.filter(s => typeof s === 'string' && s.trim());
    const cleanInt = interests.filter(s => typeof s === 'string' && s.trim());

    // 2. Refresh local state immediately to prove it to the user
    setworkExperienceObj(cleanWork);
    setEducationObj(cleanEdu);
    setProjectObj(cleanProj);
    setAchievementObj(cleanAchieve);
    setSkills(cleanSkills);
    setLanguage(cleanLang);
    setInterests(cleanInt);

    tempobj = {
      BasicDetails: userDetails,
      WorkExperience: cleanWork,
      Education: cleanEdu,
      Project: cleanProj,
      Achievement: cleanAchieve,
      Language: cleanLang,
      Interest: cleanInt,
      Skills: cleanSkills,
    };
    
    setfullDetails(tempobj);
    sendDataToServer(tempobj);
  };

  // --- DERIVED VALIDATION STATE ---
  const errors = { personal: {}, work: [], education: [], project: [] };
  
  let isPersonalValid = true;
  if (!userDetails?.fullname || userDetails.fullname.trim().length < 2) {
    errors.personal.fullname = "Required (min 2 characters).";
    isPersonalValid = false;
  } else if (!/^[a-zA-Z\s]+$/.test(userDetails.fullname)) {
    errors.personal.fullname = "Only characters and spaces allowed.";
    isPersonalValid = false;
  }
  if (!userDetails?.email) {
    errors.personal.email = "Required.";
    isPersonalValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userDetails.email)) {
    errors.personal.email = "Invalid email format.";
    isPersonalValid = false;
  }
  if (userDetails?.phno && !/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(userDetails.phno)) {
    errors.personal.phno = "Invalid phone format.";
    isPersonalValid = false;
  }
  const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
  if (userDetails?.linkedin && !urlRegex.test(userDetails.linkedin)) {
    errors.personal.linkedin = "Invalid URL.";
    isPersonalValid = false;
  }
  if (userDetails?.github && !urlRegex.test(userDetails.github)) {
    errors.personal.github = "Invalid URL.";
    isPersonalValid = false;
  }

  let isWorkValid = true;
  workExperienceObj.forEach((work, idx) => {
    let err = {};
    if (Object.keys(work).length > 0 && (work.designation || work.companyname || work.startdate || work.enddate || work.details?.length > 0)) {
      if (!work.designation?.trim()) { err.designation = "Required"; isWorkValid = false; }
      if (!work.companyname?.trim()) { err.companyname = "Required"; isWorkValid = false; }
      if (!work.startdate?.trim()) { err.startdate = "Required"; isWorkValid = false; }
    }
    errors.work[idx] = err;
  });

  let isEducationValid = true;
  educationObj.forEach((edu, idx) => {
    let err = {};
    if (Object.keys(edu).length > 0 && (edu.qualification || edu.school || edu.doj)) {
      if (!edu.qualification?.trim()) { err.qualification = "Required"; isEducationValid = false; }
      if (!edu.school?.trim()) { err.school = "Required"; isEducationValid = false; }
      if (!edu.doj?.trim()) { err.doj = "Required"; isEducationValid = false; }
    }
    errors.education[idx] = err;
  });

  let isProjectValid = true;
  projectObj.forEach((proj, idx) => {
    let err = {};
    if (Object.keys(proj).length > 0 && (proj.projectname || proj.projectyear || proj.projectlink || proj.details?.length > 0)) {
      if (!proj.projectname?.trim()) { err.projectname = "Required"; isProjectValid = false; }
      if (!proj.projectyear?.trim()) { err.projectyear = "Required"; isProjectValid = false; }
      if (proj.projectlink && !urlRegex.test(proj.projectlink)) {
        err.projectlink = "Invalid URL text.";
        isProjectValid = false;
      }
    }
    errors.project[idx] = err;
  });

  const getIsNextDisabled = () => {
    if (currentPage === 1) return !isPersonalValid;
    if (currentPage === 2) return !isWorkValid;
    if (currentPage === 3) return !isEducationValid;
    if (currentPage === 5) return !isProjectValid;
    return false;
  };
  // --------------------------------

  const [currentPage, setCurrentPage] = useState(1);
  const nextPage = () => setCurrentPage((p) => p + 1);
  const prevPage = () => setCurrentPage((p) => p - 1);

  const STEPS = [
    { label: "Personal", icon: "👤" },
    { label: "Work", icon: "💼" },
    { label: "Education", icon: "🎓" },
    { label: "Skills", icon: "⚡" },
    { label: "Projects", icon: "🚀" },
    { label: "Awards", icon: "🏆" },
  ];

  const sectionMeta = {
    1: { title: "Personal Details", subtitle: "Let's start with the basics — who are you?" },
    2: { title: "Work Experience", subtitle: "Add your professional journey, one role at a time." },
    3: { title: "Education", subtitle: "List the institutions that shaped your knowledge." },
    4: { title: "Skills & Others", subtitle: "Highlight your skills, languages, and interests." },
    5: { title: "Projects", subtitle: "Showcase your builds, experiments, and creations." },
    6: { title: "Achievements", subtitle: "Celebrate the awards and milestones you're proud of." },
  };

  let currentPageComponent;
  switch (currentPage) {
    case 1:
      currentPageComponent = (
        <UserDetailsInput handleUserDetails={handleUserDetails} userDetails={userDetails} errors={errors.personal} />
      );
      break;

    case 2:
      currentPageComponent = (
        <div className="workExperienceProjMain">
          {workExperienceObj.length > 0 &&
            workExperienceObj
              .filter((obj) => Object.keys(obj).length > 0)
              .map((obj, index) => (
                <div key={index} className="entryCardWrapper">
                  <WorkExperienceInput
                    index={index}
                    value={workExperienceObj[index]}
                    setworkExperienceObj={setworkExperienceObj}
                    workExperienceObj={workExperienceObj}
                    handleWorkExpDelete={handleWorkExpDelete}
                    errors={errors.work[index]}
                  />
                  <div className="entryDeleteBtn" onClick={() => handleWorkExpDelete(index)}>
                    <WhiteDeleteIcon />
                  </div>
                </div>
              ))}
          {workExperienceObj.length === 0 && (
            <div className="emptyState">
              <span className="emptyStateIcon">💼</span>
              <p className="emptyStateText">No work experience added yet.</p>
              <p className="emptyStateHint">Click the button below to add your first role.</p>
            </div>
          )}
          <GradientButton variant="outlined" type="button" onClick={renderWorkExperience} sx={{ borderRadius: "30px" }}>
            + Add Work Experience
          </GradientButton>
        </div>
      );
      break;

    case 3:
      currentPageComponent = (
        <div className="educationMain">
          {educationObj.length > 0 &&
            educationObj
              .filter((obj) => Object.keys(obj).length > 0)
              .map((obj, index) => (
                <EducationInput
                  key={index}
                  handleEducationChange={handleEducationChange}
                  index={index}
                  value={educationObj[index]}
                  handleEducationDelete={handleEducationDelete}
                  errors={errors.education[index]}
                />
              ))}
          {educationObj.length === 0 && (
            <div className="emptyState">
              <span className="emptyStateIcon">🎓</span>
              <p className="emptyStateText">No education entries added yet.</p>
              <p className="emptyStateHint">Click the button below to add your qualifications.</p>
            </div>
          )}
          <GradientButton variant="outlined" type="button" onClick={renderEducation} sx={{ borderRadius: "30px", width: "100%" }}>
            + Add Education
          </GradientButton>
        </div>
      );
      break;

    case 4:
      currentPageComponent = (
        <div className="skillLang">
          <SkillsInput skills={skills} setSkills={setSkills} />
          <LanguageInput language={language} setLanguage={setLanguage} />
          <InterestsInput interests={interests} setInterests={setInterests} />
        </div>
      );
      break;

    case 5:
      currentPageComponent = (
        <div className="workExperienceProjMain">
          {projectObj.length > 0 &&
            projectObj
              .filter((obj) => Object.keys(obj).length > 0)
              .map((obj, index) => (
                <div key={index} className="entryCardWrapper">
                  <ProjectsInput
                    index={index}
                    setProjectObj={setProjectObj}
                    projectObj={projectObj}
                    value={projectObj[index]}
                    handleProjDelete={handleProjDelete}
                    errors={errors.project[index]}
                  />
                  <div className="entryDeleteBtn" onClick={() => handleProjDelete(index)}>
                    <WhiteDeleteIcon />
                  </div>
                </div>
              ))}
          {projectObj.length === 0 && (
            <div className="emptyState">
              <span className="emptyStateIcon">🚀</span>
              <p className="emptyStateText">No projects added yet.</p>
              <p className="emptyStateHint">Click the button below to showcase your work.</p>
            </div>
          )}
          <GradientButton variant="outlined" type="button" onClick={renderProjects} sx={{ borderRadius: "30px" }}>
            + Add Project
          </GradientButton>
        </div>
      );
      break;

    case 6:
      currentPageComponent = (
        <div className="achievementMain">
          {achievementObj.length > 0 &&
            achievementObj.map((obj, index) => (
              <AchievementInput
                key={index}
                handleAchievementChange={handleAchievementChange}
                index={index}
                value={achievementObj[index]}
                handleAchievementDelete={handleAchievementDelete}
              />
            ))}
          {achievementObj.length === 0 && (
            <div className="emptyState">
              <span className="emptyStateIcon">🏆</span>
              <p className="emptyStateText">No achievements added yet.</p>
              <p className="emptyStateHint">Click the button below to add your awards & milestones.</p>
            </div>
          )}
          <GradientButton variant="outlined" type="button" onClick={renderAchievement} sx={{ borderRadius: "30px", width: "100%" }}>
            + Add Achievement
          </GradientButton>
        </div>
      );
      break;

    default:
      currentPageComponent = null;
  }

  return (
    <div className="cvinput_page">
      <Navbar />
      <div className="cvinput_box">

        {/* Step indicator pills */}
        <div className="stepIndicatorBar">
          {STEPS.map((step, i) => {
            const stepNum = i + 1;
            const isActive = stepNum === currentPage;
            const isCompleted = stepNum < currentPage;
            return (
              <div
                key={stepNum}
                className={`stepPill${isActive ? " stepPill--active" : ""}${isCompleted ? " stepPill--done" : ""}`}
              >
                <span className="stepPillIcon">{isCompleted ? "✓" : step.icon}</span>
                <span className="stepPillLabel">{step.label}</span>
              </div>
            );
          })}
        </div>

        {/* Section heading */}
        <div className="sectionHeading">
          <div className="sectionHeadingTitle">{sectionMeta[currentPage].title}</div>
          <div className="sectionHeadingSubtitle">{sectionMeta[currentPage].subtitle}</div>
        </div>

        {/* Progress bar */}
        <div className="linearprogress">
          <LinearWithValueLabel currentPage={currentPage} />
        </div>

        <form action="/" className="cvinputform" method="post">
          <div className="detailsComponent">{currentPageComponent}</div>

          {/* Pagination */}
          <div className="pagination">
            {currentPage !== 1 && (
              <GradientButton variant="outlined" onClick={prevPage} sx={{ borderRadius: "999px", border: "none" }}>
                ← Previous
              </GradientButton>
            )}
            <div className="paginationSpacer" />
            <span className="paginationPageLabel">{currentPage} / 6</span>
            {currentPage !== 6 ? (
              <GradientButton variant="outlined" disabled={getIsNextDisabled()} onClick={nextPage} sx={{ borderRadius: "999px", border: "none" }}>
                Next →
              </GradientButton>
            ) : (
              <GradientButton variant="contained" type="button" onClick={handleFormSubmit} sx={{ borderRadius: "999px", border: "none" }}>
                Save & View CV ✓
              </GradientButton>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default CVInputBox;
