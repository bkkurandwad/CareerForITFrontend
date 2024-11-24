import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./util/Header";
import HomePage from "./pages/HomePage";
import ProjectPage from "./pages/ProjectsPage";
import LoginPage from "./pages/LoginPage";
import CodeDashboardPage from "./pages/CodeDashboardPage";
import CodeNowPage from "./pages/CodeNowPage";
import AssessmentPage from "./pages/AssesmentPage";
import MainDash from "./pages/MainDash"
import LearnPage from "./pages/LearnPage";
import ModuleDetail from "./pages/ModuleDetail";
import SignupPage from "./pages/SignupPage";
import InterviewPage from "./pages/InterviewPage";
import ContactUs from "./pages/ContactUsPage";
import ResumeForm from "./pages/ResumePage";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<MainDash />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/resume" element={<ResumeForm />} />
        <Route path="/projects" element={<ProjectPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/dashboard" element={<CodeDashboardPage />} />
        <Route path="/codenow/:id" element={<CodeNowPage />} />
        <Route path="/assesment" element={<AssessmentPage />} />
        <Route path="/main" element={<MainDash />} />
        <Route path="/learn" element={<LearnPage />} />
        <Route path="/learn/:moduleName" element={<ModuleDetail />} />
        <Route path="/interview" element={<InterviewPage />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
      {/* </header>
      </div> */}
    </Router>
  );
}

export default App;
