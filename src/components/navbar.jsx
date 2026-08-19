import { NavLink } from "react-router-dom";
import { FaHome, FaChartBar, FaHistory, FaUser } from "react-icons/fa";
import { FaCog } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="navbar">

      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <FaHome /> Home
      </NavLink>

      <NavLink
        to="/dashboard"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <FaChartBar /> Dashboard
      </NavLink>

      <NavLink
        to="/history"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <FaHistory /> History
      </NavLink>

      <NavLink
        to="/profile"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <FaUser /> Profile
      </NavLink>

      <NavLink
  to="/setting"
  className={({ isActive }) => (isActive ? "active" : "")}
>
  <FaCog /> Settings
</NavLink>

    </nav>
  );
}