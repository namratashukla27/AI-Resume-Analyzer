import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import "../App.css";

export default function History() {
  const history =
    JSON.parse(localStorage.getItem("history")) || [];
    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState("newest");

const filteredHistory = history
  .filter((item) =>
    item.fileName.toLowerCase().includes(search.toLowerCase())
  )
  .sort((a, b) => {
    if (sortOrder === "newest") {
      return new Date(b.date) - new Date(a.date);
    }
    return new Date(a.date) - new Date(b.date);
  });
  return (
    <div className="page">
      <div className="history-header">

  <h1 className="history-title">
  <FaHistory />
  Analysis History
</h1>

  <p>
    View all previously analyzed resumes and their ATS scores.
  </p>

</div>
<div className="search-box">
  <input
    type="text"
    placeholder="Search by resume name..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
</div>
<div className="sort-box">
  <select
    value={sortOrder}
    onChange={(e) => setSortOrder(e.target.value)}
  >
    <option value="newest">Newest First</option>
    <option value="oldest">Oldest First</option>
  </select>
</div>
      <button
  className="clear-btn"
  onClick={() => {

    const history = localStorage.getItem("history");

    if(history){
      localStorage.setItem("backupHistory", history);
    }

    localStorage.removeItem("history");

    window.location.reload();

  }}
>
  Clear Analysis History
</button>
{!localStorage.getItem("history") &&
localStorage.getItem("backupHistory") && (

<button
className="restore-btn"
onClick={() => {

const backup = localStorage.getItem("backupHistory");

if(backup){
localStorage.setItem("history", backup);
}

window.location.reload();

}}
>
↩ Restore History
</button>

)}
      {filteredHistory.length === 0 ? (
        <p>No resume analyzed yet.</p>
      ) : (
        <table className="history-table">
          <thead>
            <tr>
              <th>Resume Name</th>
              <th>ATS Score</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredHistory.map((item, index) => (
              <tr key={index}>
                <td>{item.fileName}</td>
                <td>
  <span
    className={
      item.score >= 80
        ? "score-badge good"
        : item.score >= 60
        ? "score-badge average"
        : "score-badge poor"
    }
  >
    {item.score}/100
  </span>
</td>
                <td>{item.date}</td>
                <td>
  <button
  className="delete-btn"
  onClick={() => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this analysis?"
    );

    if (!confirmDelete) return;

    const updatedHistory = history.filter((_, i) => i !== index);

    localStorage.setItem(
      "history",
      JSON.stringify(updatedHistory)
    );

    window.location.reload();

  }}
>
  <FaTrashAlt />
</button>
</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}