import "../App.css";

import {
  FaFileAlt,
  FaTrophy,
  FaChartLine,
  FaHistory,
  FaRobot,
  FaReact,
  FaFilePdf,
  FaCode,
  FaLayerGroup,
  FaFolderOpen,
  FaBullseye,
} from "react-icons/fa";
export default function Profile() {
  const history = JSON.parse(localStorage.getItem("history")) || [];

  const totalAnalyses = history.length;

  const bestScore =
    history.length > 0
      ? Math.max(...history.map((item) => item.score))
      : 0;

  const averageScore =
    history.length > 0
      ? Math.round(
          history.reduce((sum, item) => sum + item.score, 0) /
            history.length
        )
      : 0;

  const lastAnalysis =
    history.length > 0
      ? history[history.length - 1].date
      : "No Analysis";

  return (
    <div className="profile-page">

      {/* ================= PROFILE CARD ================= */}

      <div className="profile-card">

        <div className="profile-left">

          <div className="profile-avatar">
           <span>NS</span>
          </div>

        </div>

        <div className="profile-right">

          <h1>Namrata Shukla</h1>

          <p className="profile-role">
            Frontend Developer | B.Tech CSE Student
          </p>

          <p className="profile-email">
            shuklanamrata267@gmail.com
          </p>

          <p className="profile-bio">
            Passionate about building user-friendly web applications and
            exploring AI technologies.
            Currently working on an AI Resume Analyzer using
            React, Groq API, PDF.js and jsPDF.
          </p>

        </div>

      </div>

      {/* ================= STATISTICS ================= */}

      <div className="stats-grid">

        <div className="stat-card">

          <div className="stat-icon">
            <FaFileAlt />
          </div>

          <h3>Total Analyses</h3>

          <div className="stat-number">
            {totalAnalyses}
          </div>

          <p className="stat-text">
            Resumes Analyzed
          </p>

        </div>

        <div className="stat-card">

          <div className="stat-icon">
            <FaTrophy />
          </div>

          <h3>Best ATS Score</h3>

          <div className="stat-number">
            {bestScore}/100
          </div>

          <p className="stat-text">
            Highest Score
          </p>

        </div>

        <div className="stat-card">

          <div className="stat-icon">
            <FaChartLine />
          </div>

          <h3>Average ATS Score</h3>

          <div className="stat-number">
            {averageScore}/100
          </div>

          <p className="stat-text">
            Overall Average
          </p>

        </div>

        <div className="stat-card">

          <div className="stat-icon">
            <FaHistory />
          </div>

          <h3>Last Analysis</h3>

          <div className="stat-number last-analysis-date">
  <span>{lastAnalysis.split(",")[0]}</span>
  <span>{lastAnalysis.split(",")[1]}</span>
</div>
          <p className="stat-text">
            Latest Resume
          </p>

        </div>

      </div>
            {/* ================= TECHNOLOGY STACK ================= */}

      <div className="ai-info-card">

        <h2>Technology Stack</h2>

        <div className="info-row">
          <span><FaRobot /> AI Model</span>
          <span className="tech-badge">Groq (Llama 3.3)</span>
        </div>

        <div className="info-row">
          <span><FaReact /> Framework</span>
          <span className="tech-badge">React + Vite</span>
        </div>

        <div className="info-row">
          <span><FaFilePdf /> PDF Extraction</span>
          <span className="tech-badge">PDF.js</span>
        </div>

        <div className="info-row">
          <span><FaCode /> PDF Report</span>
          <span className="tech-badge">jsPDF</span>
        </div>

        <div className="info-row">
          <span><FaLayerGroup /> Version</span>
          <span className="tech-badge">v1.0</span>
        </div>

      </div>

      {/* ================= SKILLS ================= */}

      <div className="skills-card">

        <h2>Skills</h2>

        <div className="skills-list">

  <span className="skill-badge">HTML5</span>

  <span className="skill-badge">CSS3</span>

  <span className="skill-badge">JavaScript ES6+</span>

  <span className="skill-badge">React.js</span>

  <span className="skill-badge">Vite</span>

  <span className="skill-badge">Responsive Design</span>

  <span className="skill-badge">Groq API</span>

  <span className="skill-badge">PDF.js</span>

  <span className="skill-badge">jsPDF</span>

  <span className="skill-badge">Git & GitHub</span>

</div>
      </div>

      {/* ================= PROJECT INFO ================= */}

      <div className="project-card">

        <h2>Project Information</h2>

        <div className="info-row">
          <span><FaFolderOpen /> Project Name</span>
          <span>AI Resume Analyzer v1.0</span>
        </div>

        <div className="info-row">
          <span><FaBullseye /> Purpose</span>
          <span>Analyze PDF resumes using Groq AI and generate ATS reports with downloadable PDF results.</span>
        </div>

        <div className="info-row">
          <span><FaRobot /> AI Provider</span>
          <span>Groq API (Llama 3.3)</span>
        </div>

        <div className="info-row">
          <span><FaReact /> Frontend</span>
          <span>React.js + Vite</span>
        </div>

        <div className="info-row">
          <span><FaFilePdf /> Report Format</span>
          <span>Professional PDF Reports</span>
        </div>

      </div>

    </div>
  );
}