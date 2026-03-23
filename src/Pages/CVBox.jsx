import React, { useEffect, useState, useRef } from "react";
import Navbar from "../Component/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import cookie from "js-cookie";
import "./cv.css";
import "./home.css";
import html2pdf from "html2pdf.js";
import {
  PhoneAndroid,
  Home,
  Email,
  LinkedIn,
  GitHub,
} from "@mui/icons-material";
import { CircularProgress } from "@mui/material";

function CVBox() {
  const [jsonData, setJsonData] = useState({});
  const [loadstatus, setLoadstatus] = useState(false);
  const navigate = useNavigate();
  const token = cookie.get("token");
  const isAuthenticated = cookie.get("isAuthenticated");
  const pdfRef = useRef();

  useEffect(() => {
    if (!token) {
      setTimeout(() => {
        navigate("/login");
      }, 0);
    } else if (isAuthenticated && token) {
      const fetchData = async () => {
        let url = process.env.REACT_APP_API_URL + "/fetchform";
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
              setLoadstatus(true);
              if (res.data) setJsonData(res.data);
            }
          })
          .catch(function (err) {
            console.log(err);
          });
      };

      fetchData();
    }
  }, [token, isAuthenticated, navigate]);

  const generatePdf = () => {
    const pdfContent = pdfRef.current;
    if (pdfContent) {
      const pdfOptions = {
        margin: [10, 0, 10, 0], // Top, Left, Bottom, Right margins in mm
        filename: "cv.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
        },
      };

      try {
        // html2pdf can directly accept a DOM node. This ensures 1:1 parity with the preview!
        html2pdf().from(pdfContent).set(pdfOptions).save();
      } catch (error) {
        console.error("Error generating PDF:", error);
      }
    }
  };

  // Helper to format URLs safely
  const formatUrl = (url) => {
    if (!url) return "";
    return url.startsWith("http") ? url : "https://" + url;
  };

  // Helper to format Date strings to "Mon YYYY"
  const formatMonthYear = (dateStr) => {
    if (!dateStr) return "";
    if (/^\d{4}-\d{2}$/.test(dateStr)) {
      const [y, m] = dateStr.split('-');
      const date = new Date(y, m - 1);
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    }
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      const [y, m, d] = dateStr.split('-');
      const date = new Date(y, m - 1, d);
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    }
    return dateStr;
  };

  return (
    <div className="cv_preview_page">
      <Navbar />
      {loadstatus ? (
        <>
          {Object.keys(jsonData).length === 0 ? (
            <div className="home_body">
              <div className="hero_badge">No CV Found</div>
              <h1>
                You haven't created a <span className="gradient_text">CV yet</span>
              </h1>
              <p className="hero_subtitle">
                Get started by filling in your details — it only takes a few minutes.
              </p>
              <div className="hero_cta_group">
                <button
                  type="button"
                  className="btn_primary"
                  onClick={() => navigate("/cvinput")}
                >
                  Create My CV →
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="cvboxButtonGroup">
                <button
                  type="button"
                  className="cvpdfButtons"
                  onClick={generatePdf}
                >
                  ⬇ Download PDF
                </button>
                <button
                  type="button"
                  className="cvpdfButtons"
                  onClick={() => navigate("/cvinput")}
                >
                  ✏ Edit CV
                </button>
              </div>

              {/* The ATS-Friendly Resume Content Box */}
              <div style={{ display: "flex", justifyContent: "center", paddingBottom: "4rem" }}>
                <div className="ats-resume-wrapper" ref={pdfRef}>
                  
                  {/* HEADER & CONTACT */}
                  <div className="ats-header">
                    <div className="ats-name">
                      {jsonData.BasicDetails?.fullname}
                    </div>
                    <div className="ats-contact">
                      {jsonData.BasicDetails?.phno && (
                        <>
                          <span className="ats-contact-item">
                            <PhoneAndroid sx={{ fontSize: "1rem" }} />
                            {jsonData.BasicDetails.phno}
                          </span>
                        </>
                      )}
                      
                      {jsonData.BasicDetails?.email && (
                        <>
                          {jsonData.BasicDetails?.phno && <span className="ats-contact-separator">|</span>}
                          <span className="ats-contact-item">
                            <Email sx={{ fontSize: "1rem" }} />
                            <a href={`mailto:${jsonData.BasicDetails.email}`} className="ats-contact-link">
                              {jsonData.BasicDetails.email}
                            </a>
                          </span>
                        </>
                      )}
                      
                      {jsonData.BasicDetails?.address && (
                        <>
                          {(jsonData.BasicDetails?.phno || jsonData.BasicDetails?.email) && <span className="ats-contact-separator">|</span>}
                          <span className="ats-contact-item">
                            <Home sx={{ fontSize: "1rem" }} />
                            {jsonData.BasicDetails.address}
                          </span>
                        </>
                      )}
                      
                      {jsonData.BasicDetails?.linkedin && (
                        <>
                          {(jsonData.BasicDetails?.phno || jsonData.BasicDetails?.email || jsonData.BasicDetails?.address) && <span className="ats-contact-separator">|</span>}
                          <span className="ats-contact-item">
                            <LinkedIn sx={{ fontSize: "1rem" }} />
                            <a href={formatUrl(jsonData.BasicDetails.linkedin)} className="ats-contact-link">
                              LinkedIn
                            </a>
                          </span>
                        </>
                      )}
                      
                      {jsonData.BasicDetails?.github && (
                        <>
                          {(jsonData.BasicDetails?.phno || jsonData.BasicDetails?.email || jsonData.BasicDetails?.address || jsonData.BasicDetails?.linkedin) && <span className="ats-contact-separator">|</span>}
                          <span className="ats-contact-item">
                            <GitHub sx={{ fontSize: "1rem" }} />
                            <a href={formatUrl(jsonData.BasicDetails.github)} className="ats-contact-link">
                              GitHub
                            </a>
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* SKILLS */}
                  {jsonData.Skills && jsonData.Skills.length > 0 && (
                    <div className="ats-section">
                      <div className="ats-section-title">Skills & Expertise</div>
                      <div className="ats-skills-list">
                        {jsonData.Skills.join(" • ")}
                      </div>
                    </div>
                  )}

                  {/* WORK EXPERIENCE */}
                  {jsonData.WorkExperience && jsonData.WorkExperience.length > 0 && (
                    <div className="ats-section">
                      <div className="ats-section-title">Professional Experience</div>
                      {jsonData.WorkExperience.map((work, index) => (
                        <div className="ats-entry" key={index}>
                          <div className="ats-entry-header">
                            <div>
                              <span className="ats-entry-title">{work.designation}</span>
                              {work.companyname && (
                                <span>, <span className="ats-entry-subtitle">{work.companyname}</span></span>
                              )}
                            </div>
                            <div className="ats-entry-date">
                              {work.startdate ? `${formatMonthYear(work.startdate)} – ${formatMonthYear(work.enddate) || "Present"}` : ""}
                            </div>
                          </div>
                          {work.details && work.details.length > 0 && (
                            <ul className="ats-entry-details">
                              {work.details.map((detail, idx) => (
                                <li key={idx}>{detail}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* PROJECTS */}
                  {jsonData.Project && jsonData.Project.length > 0 && (
                    <div className="ats-section">
                      <div className="ats-section-title">Projects</div>
                      {jsonData.Project.map((proj, index) => (
                        <div className="ats-entry" key={index}>
                          <div className="ats-entry-header">
                            <div>
                              <span className="ats-entry-title">{proj.projectname}</span>
                              {proj.projectlink && (
                                <span className="ats-entry-subtitle">
                                  {" | "}
                                  <a href={formatUrl(proj.projectlink)} className="ats-contact-link">View Project</a>
                                </span>
                              )}
                            </div>
                            <div className="ats-entry-date">{formatMonthYear(proj.projectyear)}</div>
                          </div>
                          {proj.details && proj.details.length > 0 && (
                            <ul className="ats-entry-details">
                              {proj.details.map((detail, idx) => (
                                <li key={idx}>{detail}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* EDUCATION */}
                  {jsonData.Education && jsonData.Education.length > 0 && (
                    <div className="ats-section">
                      <div className="ats-section-title">Education</div>
                      {jsonData.Education.map((edu, index) => (
                        <div className="ats-entry" key={index}>
                          <div className="ats-entry-header">
                            <div>
                              <span className="ats-entry-title">{edu.qualification}</span>
                              {edu.school && (
                                <span>, <span className="ats-entry-subtitle">{edu.school}</span></span>
                              )}
                            </div>
                            <div className="ats-entry-date">{formatMonthYear(edu.doj)}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* ACHIEVEMENTS */}
                  {jsonData.Achievement && jsonData.Achievement.length > 0 && (
                    <div className="ats-section">
                      <div className="ats-section-title">Achievements</div>
                      {jsonData.Achievement.map((ach, index) => (
                        <div className="ats-entry" key={index} style={{ marginBottom: "0.5rem" }}>
                          <span className="ats-entry-title" style={{ fontSize: "1rem" }}>{ach.title}</span>
                          {ach.subtitle && (
                            <span> – <span className="ats-entry-details" style={{ paddingLeft: 0, display: "inline" }}>{ach.subtitle}</span></span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* LANGUAGES & INTERESTS */}
                  {(jsonData.Language?.length > 0 || jsonData.Interest?.length > 0) && (
                    <div className="ats-section" style={{ display: "flex", gap: "2rem" }}>
                      {jsonData.Language && jsonData.Language.length > 0 && (
                        <div style={{ flex: 1 }}>
                          <div className="ats-section-title" style={{ borderBottom: "none", paddingBottom: 0, marginBottom: "0.4rem" }}>Languages</div>
                          <div className="ats-skills-list">{jsonData.Language.join(" • ")}</div>
                        </div>
                      )}
                      {jsonData.Interest && jsonData.Interest.length > 0 && (
                        <div style={{ flex: 1 }}>
                          <div className="ats-section-title" style={{ borderBottom: "none", paddingBottom: 0, marginBottom: "0.4rem" }}>Interests</div>
                          <div className="ats-skills-list">{jsonData.Interest.join(" • ")}</div>
                        </div>
                      )}
                    </div>
                  )}

                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <div
          className="progress"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress
            size={100}
            sx={{ color: "#a78bfa", margin: "0 auto" }}
          />
        </div>
      )}
    </div>
  );
}

export default CVBox;
