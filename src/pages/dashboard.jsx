import { FaChartBar } from "react-icons/fa";
import ATSChart from "../components/ATSChart";
import "../App.css";

export default function Dashboard() {

  const totalAnalyses = localStorage.getItem("totalAnalyses") || 0;
  const averageScore = localStorage.getItem("averageScore") || 0;
  const bestScore = localStorage.getItem("bestScore") || 0;
  const history =
  JSON.parse(localStorage.getItem("history")) || [];

  return (
    <div className="page">

      <h1>Dashboard</h1>

      <div className="dashboard-grid">

        <div className="dashboard-card">
          <h2>Total Analyses</h2>
          <p>{totalAnalyses}</p>
        </div>

        <div className="dashboard-card">
          <h2>Average ATS Score</h2>
          <p>{averageScore}/100</p>
        </div>

        <div className="dashboard-card">
          <h2>Best ATS Score</h2>
          <p>{bestScore}/100</p>
        </div>

      </div>

      <div className="chart-card">
  <h2 className="chart-title">
  <FaChartBar />
  ATS Score Analytics
</h2>

<p>
Track ATS scores of previously analyzed resumes.
</p>

  <ATSChart history={history} />
</div>

    </div>
  );
}