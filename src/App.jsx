import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Profile from "./pages/profile";
import History from "./pages/history";
import Dashboard from "./pages/dashboard";
import Setting from "./pages/setting";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/history" element={<History />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/setting" element={<Setting />} />
      </Routes>
    </>
  );
}
export default App;