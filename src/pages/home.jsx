import {
  FaStar,
  FaCheckCircle,
  FaTimesCircle,
  FaLightbulb,
  FaQuestionCircle,
  FaBook,
  FaFileAlt
} from "react-icons/fa";
import { analyzeResumeWithGroq } from "../services/groq";
import { downloadReport } from "../utils/downloadReport";

import "../App.css";
import { useState, useEffect } from "react";
import { extractTextFromPDF } from "../utils/pdfExtractor";


export default function Home() {
  const [fileName, setFileName] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [score, setScore] = useState(0);
  const [showText, setShowText] = useState(false);
  const [aiResult, setAiResult] = useState("");
const [loading, setLoading] = useState(false);
const [analysisData, setAnalysisData] = useState({});
useEffect(() => {
  const savedFileName = localStorage.getItem("fileName");
  const savedResumeText = localStorage.getItem("resumeText");
  const savedScore = localStorage.getItem("score");
  const savedAiResult = localStorage.getItem("aiResult");
  const savedAnalysisData = localStorage.getItem("analysisData");

  if (savedFileName) setFileName(savedFileName);
  if (savedResumeText) setResumeText(savedResumeText);
  if (savedScore) setScore(Number(savedScore));
  if (savedAiResult) setAiResult(savedAiResult);
  if (savedAnalysisData) {
    setAnalysisData(JSON.parse(savedAnalysisData));
  }
}, []);


  async function handleUpload(e) {
  const file = e.target.files[0];

  if (!file) return;

  try {
    setLoading(true);
    setAiResult("");
    setAnalysisData({});
    setScore(0);

    setFileName(file.name);
    localStorage.setItem("fileName", file.name);

    // 1. Extract text from PDF
    const text = await extractTextFromPDF(file);

    if (!text || !text.trim()) {
      throw new Error(
        "No readable text was found in this PDF. Please upload a text-based PDF."
      );
    }

    console.log("PDF text extracted successfully:", text.length, "characters");

    setResumeText(text);
    localStorage.setItem("resumeText", text);

    // 2. Send resume to Groq
    console.log("Sending resume to Groq...");

    const result = await analyzeResumeWithGroq(text);

    console.log("Groq response received:", result);

    if (!result) {
      throw new Error("Groq returned an empty response.");
    }

    setAiResult(result);
    localStorage.setItem("aiResult", result);

    // 3. Extract sections from AI response
    const sections = {
      score: result.match(/ATS Score:\s*(.*)/)?.[1] || "",

      summary:
        result.match(
          /Resume Summary:\s*([\s\S]*?)\s*Missing Skills:/
        )?.[1] || "",

      skills:
        result.match(
          /Missing Skills:\s*([\s\S]*?)\s*Strengths:/
        )?.[1] || "",

      strengths:
        result.match(
          /Strengths:\s*([\s\S]*?)\s*Weaknesses:/
        )?.[1] || "",

      weaknesses:
        result.match(
          /Weaknesses:\s*([\s\S]*?)\s*Suggestions:/
        )?.[1] || "",

      suggestions:
        result.match(
          /Suggestions:\s*([\s\S]*?)\s*Interview Questions:/
        )?.[1] || "",

      interview:
        result.match(
          /Interview Questions:\s*([\s\S]*?)\s*Recommended Courses:/
        )?.[1] || "",

      courses:
        result.match(
          /Recommended Courses:\s*([\s\S]*)/
        )?.[1] || "",
    };

    setAnalysisData(sections);
    localStorage.setItem("analysisData", JSON.stringify(sections));

    // 4. Extract ATS score
    const scoreMatch = result.match(/ATS Score:\s*(\d+)\s*\/\s*100/);

    if (scoreMatch) {
      const currentScore = Number(scoreMatch[1]);

      setScore(currentScore);
      localStorage.setItem("score", currentScore);

      // Total analyses
      let totalAnalyses =
        Number(localStorage.getItem("totalAnalyses")) || 0;

      totalAnalyses++;

      localStorage.setItem(
        "totalAnalyses",
        totalAnalyses
      );

      // Store all scores
      let scores =
        JSON.parse(localStorage.getItem("scores")) || [];

      scores.push(currentScore);

      localStorage.setItem(
        "scores",
        JSON.stringify(scores)
      );

      // Best score
      const bestScore = Math.max(...scores);

      localStorage.setItem(
        "bestScore",
        bestScore
      );

      // Average score
      const averageScore =
        scores.reduce(
          (sum, value) => sum + value,
          0
        ) / scores.length;

      localStorage.setItem(
        "averageScore",
        Math.round(averageScore)
      );

      // Save history
      let history =
        JSON.parse(localStorage.getItem("history")) || [];

      history.push({
        fileName: file.name,
        score: currentScore,
        date: new Date().toLocaleString(),
      });

      localStorage.setItem(
        "history",
        JSON.stringify(history)
      );
    } else {
      console.warn(
        "ATS score could not be found in Groq response."
      );
    }
  } catch (error) {
    console.error("Resume analysis error:", error);

    setAiResult(
      error?.message ||
        "Unable to analyze resume. Please try again."
    );
  } finally {
    setLoading(false);
  }
}
  return (
    <div className="container">

      {/* Hero Section */}
      <div className="hero">

        <div className="logo-box">

  <div className="hero-glow"></div>

  <div className="title-row">

    <div className="ai-icon">AI</div>

    <div>
      <h1>AI Resume Analyzer</h1>
      <p>Smart ATS Resume Analysis Tool</p>
    </div>

  </div>

</div>

        <label className="btn upload-btn">

          Upload Resume

          <input
            type="file"
            accept=".pdf"
            hidden
            onChange={handleUpload}
          />

        </label>

        {fileName && (
  <div className="file-name">
    <span className="file-icon">📄</span>
    <span className="file-text">{fileName}</span>
  </div>
)}
      </div>

      {/* Dashboard */}

      <div className="layout">

        <div className="home-analysis">

         <div className="analysis-header">
  <h2 className="analysis-title">Resume Analysis</h2>
</div>

          <button
            className="toggle-btn"
            onClick={() => setShowText(!showText)}
          >
            {showText ? "Hide Resume" : "Show Resume"}
          </button>

          {showText && (
            <div className="text-box">
              {resumeText}
            </div>
          )}

          {loading && (
  <p>Analyzing Resume with AI...</p>
)}

{aiResult && (
  <div className="ai-result-wrapper">

    <div className="ai-result-grid">

      <div className="ai-result-card ai-score">

  <h3>ATS Score</h3>

  <div
    className="score-circle"
    style={{
      background: `conic-gradient(#4F46E5 ${score * 3.6}deg, #E5E7EB 0deg)`
    }}
  >
    <div className="score-inner">
      {score}/100
    </div>
  </div>

  <p className="score-text">
    Resume Quality Score
  </p>

  <div
    className={`status-badge ${
      score >= 80
        ? "excellent"
        : score >= 60
        ? "good"
        : "poor"
    }`}
  >
    {score >= 80
      ? "Excellent Resume"
      : score >= 60
      ? "Good Resume"
      : "Needs Improvement"}
  </div>

</div>

      <div className="ai-result-card ai-summary">

  <h3><FaFileAlt /> Resume Summary</h3>

  <div className="badge-container">

  {analysisData.summary
    ?.split("\n")
    .filter(item => item.trim())
    .map((item, index) => (
      <span className="ai-badge" key={index}>
        {item.replace("-", "")}
      </span>
    ))}

</div>
</div>


      <div className="ai-result-card ai-missing">

<h3><FaStar /> Missing Skills</h3>

<div className="badge-container">

{
analysisData.skills
?.split("\n")
.filter(item => item.trim())
.map((skill,index)=>(
<span className="ai-badge" key={index}>
{skill.replace("-","")}
</span>
))
}

</div>

</div>


      <div className="ai-result-card ai-strength">

<h3><FaCheckCircle /> Strengths</h3>


<div className="badge-container">

{
analysisData.strengths
?.split("\n")
.filter(item=>item.trim())
.map((item,index)=>(
<span className="ai-badge" key={index}>
{item.replace("-","")}
</span>
))
}

</div>

</div>


     <div className="ai-result-card ai-weakness">

  <h3><FaTimesCircle /> Weaknesses</h3>

  <div className="badge-container">

    {analysisData.weaknesses
      ?.split("\n")
      .filter(item => item.trim())
      .map((item, index) => (
        <span className="ai-badge" key={index}>
          {item.replace("-", "")}
        </span>
      ))}

  </div>

</div>


      <div className="ai-result-card ai-suggestion">

<h3><FaLightbulb /> Suggestions</h3>

<div className="badge-container">

{
analysisData.suggestions
?.split("\n")
.filter(item=>item.trim())
.map((item,index)=>(
<span className="ai-badge" key={index}>
{item.replace("-","")}
</span>
))
}

</div>

</div>

<div className="ai-result-card ai-interview">

  <h3><FaQuestionCircle /> Interview Questions</h3>

  <div className="badge-container">

    {analysisData.interview
      ?.split("\n")
      .filter(item => item.trim())
      .map((item, index) => (
        <span className="ai-badge" key={index}>
          {item.replace("-", "")}
        </span>
      ))}

  </div>

</div>

<div className="ai-result-card ai-courses">

  <h3><FaBook /> Recommended Courses</h3>

  <div className="badge-container">

    {analysisData.courses
      ?.split("\n")
      .filter(item => item.trim())
      .map((item, index) => (
        <span className="ai-badge" key={index}>
          {item.replace("-", "")}
        </span>
      ))}

  </div>

</div>

    </div>
    <button
  className="download-btn"
  onClick={() =>
    downloadReport({
  fileName,
  score,
  summary: analysisData.summary,
  skills: analysisData.skills,
  strengths: analysisData.strengths,
  weaknesses: analysisData.weaknesses,
  suggestions: analysisData.suggestions,
  interview: analysisData.interview,
  courses: analysisData.courses,
})
  }
>
  Download AI Report
</button>

  </div>
  
)}        </div>

      </div>

    </div>
  );
}
