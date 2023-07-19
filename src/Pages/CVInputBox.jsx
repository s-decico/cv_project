import { render } from "@testing-library/react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createElement } from "react";
import {
  userDetailsAtom,
  workCountAtom,
  workExperienceAtom,
} from "../Atoms/CVAtoms";
import "./cv.css";
import AchievementInput from "./InputComponents/AchievementInput";
import EducationInput from "./InputComponents/EducationInput";
import InterestsInput from "./InputComponents/InterestsInput";
import LanguageInput from "./InputComponents/LanguageInput";
import ProjectsInput from "./InputComponents/ProjectsInput";
import SkillsInput from "./InputComponents/SkillsInput";
import WorkExperienceInput from "./InputComponents/WorkExperienceInput";
import { TextField, Button } from "@mui/material";
import axios, { Axios } from "axios";
import queryString from "query-string";
import cookie from "js-cookie";

function CVInputBox() {
  let jsonData = {};
  const navigate = useNavigate();
  const token = cookie.get("token");
  useEffect(() => {
    if (token == null || token == undefined) {
      setTimeout(() => {
        navigate("/login");
      }, 0);
    } else {
      setTimeout(() => {
        navigate("/cvinput");
        const fetchData = async () => {
          axios
            .get("http://localhost:3001/fetchform", {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              withCredentials: true,
            })
            .then(function (res) {
              if (res.status === 200) {
                console.log("Received Data from Database");
                //console.log(res);
                jsonData = res.data;
                console.log(jsonData);

                if (jsonData != {}) {
                  setUserDetails(jsonData.BasicDetails);
                  setworkExperienceObj(jsonData.WorkExperience);
                  setEducationObj(jsonData.Education);
                  setProjectObj(jsonData.Project);
                  setAchievementObj(jsonData.Achievement);
                  setSkills(jsonData.Skills);
                  setLanguage(jsonData.Language);
                  setInterests(jsonData.Interest);
                }
                try {
                  let workExpLength;
                  if (jsonData.WorkExperience)
                    workExpLength = Object.keys(jsonData.WorkExperience).length;
                  // let educationLength = Object.keys(jsonData.Education).length;
                  // let projectLength = Object.keys(jsonData.Project).length;
                  // let achievementLength = Object.keys(
                  //   jsonData.Achievement
                  // ).length;
                  for (let i = 0; i < workExpLength; i++) {}
                } catch (err) {
                  console.log(err);
                }
              }
              //console.log(jsonData);
            })
            .catch(function (err) {
              console.log(err);
            });

          //Set the fetched JSON values to the corresponding state variables
        };

        fetchData();
      }, 0);
    }
  }, [token]);

  //Main State
  const [userDetails, setUserDetails] = useState();
  const [fullDetails, setfullDetails] = useState();
  //Variables
  //--------------------------------
  const [_companyname, setCompanyname] = useState("");
  const [_designation, setDesignation] = useState("");
  const [_qualification, setQualification] = useState("");
  const [_school, setSchool] = useState("");
  const [_doj, setDoj] = useState("");
  const [_title, setTitle] = useState("");
  const [_subtitle, setSubtitle] = useState("");
  let tempobj = {};

  //Component States
  //-------------------------------
  //Work Exp
  const [workExpComponent, setWorkExpComponent] = useState([{}]);
  const [workExperienceObj, setworkExperienceObj] = useState({});
  //Education
  const [educationComponent, setEducationComponent] = useState([{}]);
  const [educationObj, setEducationObj] = useState({});
  //Projects
  const [projectsComponent, setProjectsComponent] = useState([{}]);
  const [projectObj, setProjectObj] = useState({});
  //Achievement
  const [achievementComponent, setAchievementComponent] = useState([{}]);
  const [achievementObj, setAchievementObj] = useState({});
  //Skills
  const [skills, setSkills] = useState([]);
  //Language
  const [language, setLanguage] = useState([]);
  //Interests
  const [interests, setInterests] = useState([]);

  //Component render function
  //--------------------------------
  const renderWorkExperience = (e) => {
    setWorkExpComponent([...workExpComponent, {}]);
  };

  const renderEducation = (e) => {
    setEducationComponent([...educationComponent, {}]);
  };

  const renderProjects = (e) => {
    setProjectsComponent([...projectsComponent, {}]);
  };
  const renderAchievement = (e) => {
    setAchievementComponent([...achievementComponent, {}]);
  };

  // useEffect(() => {
  //   if (token) {
  //   }
  //   const fetchData = async () => {
  //     axios
  //       .get("http://localhost:3001/fetchform", {
  //         headers: {
  //           "Content-Type": "application/x-www-form-urlencoded",
  //         },
  //         withCredentials: true,
  //       })
  //       .then(function (res) {
  //         if (res.status === 200) {
  //           console.log("Received Data from Database");
  //           navigate("/cv");
  //         }
  //       })
  //       .catch(function (err) {
  //         console.log(err);
  //       });

  //     // Set the fetched JSON values to the corresponding state variables
  //     setUserDetails(jsonData.BasicDetails);
  //     setworkExperienceObj(JSON.parse(jsonData.WorkExperience));
  //     setEducationObj(JSON.parse(jsonData.Education));
  //     setProjectObj(JSON.parse(jsonData.Project));
  //     setAchievementObj(JSON.parse(jsonData.Achievement));
  //     setSkills(jsonData.Skills);
  //     setLanguage(jsonData.Language);
  //     setInterests(jsonData.Interest);
  //   };

  //   fetchData();
  // }, [token]);

  //Handler functions
  //--------------------------------
  const handleUserDetails = (e) => {
    let fieldName = e.target.name;
    let fieldValue = e.target.value;
    setUserDetails({ ...userDetails, [fieldName]: fieldValue });
  };

  const handleWorkExpChange = (event, index) => {
    const { name, value } = event.target;
    let fieldName = name;
    tempobj = {};
    tempobj = { ...workExperienceObj };
    switch (name) {
      case "companyname":
        setCompanyname(value);
        tempobj[index] = { ...tempobj[index], [fieldName]: value };
        break;
      case "designation":
        setDesignation(value);
        tempobj[index] = { ...tempobj[index], [fieldName]: value };
        break;
    }

    setworkExperienceObj(tempobj);
  };

  const handleEducationChange = (event, index) => {
    const { name, value } = event.target;
    let fieldName = name;
    tempobj = {};
    tempobj = { ...educationObj };
    switch (name) {
      case "qualification":
        setQualification(value);
        tempobj[index] = { ...tempobj[index], [fieldName]: value };
        break;
      case "school":
        setSchool(value);
        tempobj[index] = { ...tempobj[index], [fieldName]: value };
        break;
      case "doj":
        setDoj(value);
        tempobj[index] = { ...tempobj[index], [fieldName]: value };
        break;
    }
    setEducationObj(tempobj);
  };

  const handleAchievementChange = (event, index) => {
    const { name, value } = event.target;
    let fieldName = name;
    tempobj = {};
    tempobj = { ...achievementObj };
    switch (name) {
      case "title":
        setTitle(value);
        tempobj[index] = { ...tempobj[index], [fieldName]: value };
        break;
      case "subtitle":
        setSubtitle(value);
        tempobj[index] = { ...tempobj[index], [fieldName]: value };
        break;
      default:
        break;
    }
    setAchievementObj(tempobj);
  };

  const sendDataToServer = (tempobj) => {
    const stringy = JSON.stringify(tempobj);
    const encodedData = queryString.stringify(stringy, null, null, {
      encodeURIComponent: queryString.unescape,
      allowDots: true,
    });

    axios
      .post("http://localhost:3001/cvinput", encodedData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        withCredentials: true,
      })
      .then(function (res) {
        if (res.status === 200) {
          console.log("Data Saved");
          navigate("/cv");
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  };
  const handleFormSubmit = (e) => {
    tempobj = {};
    tempobj = {
      BasicDetails: userDetails,
      WorkExperience: workExperienceObj,
      Education: educationObj,
      Project: projectObj,
      Achievement: achievementObj,
      Language: language,
      Interest: interests,
      Skills: skills,
    };
    setfullDetails(tempobj);

    tempobj.BasicDetails = JSON.stringify(userDetails);
    tempobj.WorkExperience = JSON.stringify(workExperienceObj);
    tempobj.Education = JSON.stringify(educationObj);
    tempobj.Project = JSON.stringify(projectObj);
    tempobj.Achievement = JSON.stringify(achievementObj);
    sendDataToServer(tempobj);
  };

  //Render function
  return (
    <div className="input_box">
      <div className="input_heading">Fill in the details</div>
      <form action="/" className="cvinputform" method="post">
        <span className="formrow2c">
          <TextField
            id="outlined-basic"
            label="Full Name"
            variant="outlined"
            type="text"
            name="fullname"
            value={userDetails ? userDetails.fullname : ""}
            onChange={handleUserDetails}
          />
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            type="text"
            name="email"
            value={userDetails ? userDetails.email : ""}
            onChange={handleUserDetails}
          />
        </span>
        <span className="formrow2c">
          <TextField
            id="outlined-basic"
            label="Phone no"
            variant="outlined"
            type="text"
            name="phno"
            value={userDetails ? userDetails.phno : ""}
            onChange={handleUserDetails}
          />

          <TextField
            id="outlined-basic"
            label="Address"
            variant="outlined"
            type="text"
            name="address"
            value={userDetails ? userDetails.address : ""}
            onChange={handleUserDetails}
          />
        </span>
        <span className="formrow2c">
          <TextField
            id="outlined-basic"
            label="LinkedIn"
            variant="outlined"
            type="text"
            name="linkedin"
            value={userDetails ? userDetails.linkedin : ""}
            onChange={handleUserDetails}
          />

          <TextField
            id="outlined-basic"
            label="Github"
            variant="outlined"
            type="text"
            name="github"
            value={userDetails ? userDetails.github : ""}
            onChange={handleUserDetails}
          />
        </span>
        <div className="formrow1c">
          Work Experience
          {workExpComponent.map((handleWorkExpChange, index, value) => {
            return (
              <WorkExperienceInput
                key={index}
                handleWorkExpChange={handleWorkExpChange}
                index={index}
                value={workExperienceObj[index]}
              />
            );
          })}
          <Button
            variant="outlined"
            type="button"
            onClick={renderWorkExperience}
          >
            +
          </Button>
        </div>
        <div className="formrow1c">
          Education
          {educationComponent.map((obj, index) => {
            return (
              <EducationInput
                handleEducationChange={handleEducationChange}
                index={index}
              />
            );
          })}
          <Button variant="outlined" type="button" onClick={renderEducation}>
            +
          </Button>
        </div>
        <div className="formrow1c">
          <SkillsInput skills={skills} setSkills={setSkills} />
        </div>
        <div className="formrow1c">
          <LanguageInput language={language} setLanguage={setLanguage} />
        </div>
        <div className="formrow1c">
          <InterestsInput interests={interests} setInterests={setInterests} />
        </div>
        <div className="formrow1c">
          Projects
          {projectsComponent.map((obj, index) => {
            return (
              <ProjectsInput
                index={index}
                setProjectObj={setProjectObj}
                projectObj={projectObj}
              />
            );
          })}
          <Button variant="outlined" type="button" onClick={renderProjects}>
            +
          </Button>
        </div>
        <div className="formrow1c">
          Achievement
          {achievementComponent.map((obj, index) => {
            return (
              <AchievementInput
                handleAchievementChange={handleAchievementChange}
                index={index}
              />
            );
          })}
          <Button variant="outlined" type="button" onClick={renderAchievement}>
            +
          </Button>
        </div>

        <Button variant="contained" type="button" onClick={handleFormSubmit}>
          Submit
        </Button>
      </form>
    </div>
  );
}
export default CVInputBox;
