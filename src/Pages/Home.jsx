import React from "react";
import Navbar from "../Component/Navbar";
import { useNavigate } from "react-router-dom";
import "./home.css";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="home">
      <Navbar />
      <div className="home_body">
        <div className="hero_badge">✦ AI-Powered CV Builder</div>

        <h1>
          Build Your <span className="gradient_text">Dream CV</span>
          <br />
          That Gets You Hired
        </h1>

        <p className="hero_subtitle">
          Create a professional, ATS-friendly resume in minutes. Stand out from the crowd and land the job you deserve.
        </p>

        <div className="hero_cta_group">
          <button
            className="btn_primary"
            onClick={() => navigate("/register")}
          >
            Get Started Free →
          </button>
          <button
            className="btn_secondary"
            onClick={() => navigate("/login")}
          >
            Sign In
          </button>
        </div>

        <div className="home_features">
          <div className="feature_card">
            <div className="feature_icon">⚡</div>
            <h3>Quick & Easy</h3>
            <p>Build your complete CV in under 10 minutes with our guided workflow.</p>
          </div>
          <div className="feature_card">
            <div className="feature_icon">📄</div>
            <h3>PDF Export</h3>
            <p>Download your CV as a polished, print-ready PDF instantly.</p>
          </div>
          <div className="feature_card">
            <div className="feature_icon">🎯</div>
            <h3>ATS Optimized</h3>
            <p>Clean formatting that passes applicant tracking systems.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
