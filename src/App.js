import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./util/Header";
import HomePage from "./pages/HomePage";
import ProjectPage from "./pages/ProjectsPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import CodeNowPage from "./pages/CodeNowPage";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/projects" element={<ProjectPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/codenow/:id" element={<CodeNowPage />} />
      </Routes>
      {/* </header>
      </div> */}
    </Router>
  );
}

export default App;
