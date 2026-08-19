
import {
  FaCog,
  FaInfoCircle,
  FaDatabase,
  FaCode,
  FaRobot,
  FaReact,
  FaCheckCircle,
  FaTrashAlt,
  FaHistory,
  FaFilePdf
} from "react-icons/fa";

import "../App.css";

export default function Setting() {

  const handleReset = () => {
    const confirmReset = window.confirm(
      "Are you sure you want to delete all application data?"
    );

    if (confirmReset) {
      localStorage.clear();
      alert("Application data has been reset successfully.");
      window.location.reload();
    }
  };

  return (

    <div className="page">

      <div className="settings-container">

        {/* Hero */}

        <div className="settings-hero">

          <div className="hero-title">
          <div className="hero-icon">
            <FaCog />
          </div>

          <h1>Application Settings</h1>
          </div>

          <p>
            Configure your AI Resume Analyzer, manage stored data,
            and view application information.
          </p>

        </div>

        {/* Top Grid */}

        <div className="settings-grid">

          {/* General */}

          <div className="settings-card">

            <h2>
              <FaCheckCircle />
              General Settings
            </h2>

            <div className="setting-item">
              <span>Auto Save Analysis</span>
              <span className="badge green">Enabled</span>
            </div>

            <div className="setting-item">
              <span>Analysis History</span>
              <span className="badge green">Enabled</span>
            </div>

            <div className="setting-item">
              <span>Local Storage</span>
              <span className="badge blue">Active</span>
            </div>

            

          </div>

          {/* Application */}

          <div className="settings-card">

            <h2>
              <FaInfoCircle />
              Application Information
            </h2>

            <div className="setting-item">
              <span>Version</span>
              <span className="badge">v1.0</span>
            </div>

            <div className="setting-item">
              <span>
                <FaRobot /> AI Model
              </span>

              <span className="badge">
                Groq (Llama 3.3)
              </span>
            </div>

            <div className="setting-item">
              <span>
                <FaReact /> Framework
              </span>

              <span className="badge">
                React + Vite
              </span>
            </div>

            <div className="setting-item">
              <span>
                <FaFilePdf /> PDF Engine
              </span>

              <span className="badge">
                PDF.js + jsPDF
              </span>
            </div>

          </div>

        </div>

        {/* Data */}

        <div className="settings-card">

          <h2>
            <FaDatabase />
            Data Management
          </h2>

          <p className="section-text">

            Delete all locally stored resume history,
            ATS scores and application preferences.

          </p>

          <button
            className="reset-btn"
            onClick={handleReset}
          >
            <FaTrashAlt />
            Reset Application Data
          </button>

        </div>

        {/* About */}

        <div className="settings-card">

          <h2>
            <FaCode />
            About Project
          </h2>

          <p className="section-text">

            AI Resume Analyzer is a modern web application
            developed using React, Vite, Groq AI, PDF.js
            and jsPDF. It analyzes resumes, generates ATS
            scores, stores analysis history and allows PDF
            report downloads.

          </p>

        </div>

        {/* Footer */}

        <div className="settings-footer">

          <FaHistory />

          <p>
            AI Resume Analyzer • Version 1.0
          </p>

          <small>
            Built using React, Vite, Groq AI, PDF.js and jsPDF.
          </small>

        </div>

      </div>

    </div>

  );
}