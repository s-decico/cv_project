import React from "react";
import Navbar from "../Component/Navbar";
import { useNavigate } from "react-router-dom";
import cookie from "js-cookie";
import { STRINGS } from "../Constants/strings";
import "./home.css";

function Home() {
  const navigate = useNavigate();
  const isAuthenticated = cookie.get("isAuthenticated");
  return (
    <div className="home">
      <Navbar />
      <div className="home_body">
        <div className="hero_badge">{STRINGS.HOME.BADGE}</div>

        <h1>
          {STRINGS.HOME.HERO_TITLE_1}<span className="gradient_text">{STRINGS.HOME.HERO_TITLE_GRADIENT}</span>
          <br />
          {STRINGS.HOME.HERO_TITLE_2}
        </h1>

        <p className="hero_subtitle">
          {STRINGS.HOME.HERO_SUBTITLE}
        </p>

        <div className="hero_cta_group">
          {isAuthenticated ? (
            <button className="btn_primary" onClick={() => navigate("/cv")}>
              {STRINGS.HOME.GO_TO_CV}
            </button>
          ) : (
            <>
              <button
                className="btn_primary"
                onClick={() => navigate("/register")}
              >
                {STRINGS.HOME.GET_STARTED}
              </button>
              <button
                className="btn_secondary"
                onClick={() => navigate("/login")}
              >
                {STRINGS.HOME.SIGN_IN}
              </button>
            </>
          )}
        </div>

        <div className="home_features">
          {STRINGS.HOME.FEATURES.map((feature, idx) => (
            <div className="feature_card" key={idx}>
              <div className="feature_icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
