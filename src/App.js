import "./App.css";
import { BrowserRouter as Router, Route, Routes, useParams } from "react-router-dom";
import Header from "./util/Header";
import HomePage from "./pages/HomePage";
import ProjectPage from "./pages/ProjectsPage";
import LoginPage from "./pages/LoginPage";
import CodeDashboardPage from "./pages/CodeDashboardPage";
import CodeNowPage from "./pages/CodeNowPage";
import AssessmentPage from "./pages/AssesmentPage";
import MainDash from "./pages/MainDash";
import LearnPage from "./pages/LearnPage";
import ModuleDetail from "./pages/ModuleDetail";
import SignupPage from "./pages/SignupPage";
import InterviewPage from "./pages/InterviewPage";
import ContactUs from "./pages/ContactUsPage";
import ResumeForm from "./pages/ResumePage";

// Catch-all Dynamic Page
const DynamicPage = () => {
  const { path } = useParams();

  return (
    <div>
      {path === "home" && <HomePage />}
      {path === "projects" && <ProjectPage />}
      {path === "login" && <LoginPage />}
      {path === "signup" && <SignupPage />}
      {path === "dashboard" && <CodeDashboardPage />}
      {path === "codenow" && <CodeNowPage />}
      {path === "assesment" && <AssessmentPage />}
      {path === "learn" && <LearnPage />}
      {path === "interview" && <InterviewPage />}
      {path === "contact" && <ContactUs />}
      {!path && <MainDash />}
    </div>
  );
};

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
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<CodeDashboardPage />} />
        <Route path="/codenow/:id" element={<CodeNowPage />} />
        <Route path="/assesment" element={<AssessmentPage />} />
        <Route path="/learn" element={<LearnPage />} />
        <Route path="/learn/:moduleName" element={<ModuleDetail />} />
        <Route path="/interview" element={<InterviewPage />} />
        <Route path="/contact" element={<ContactUs />} />

        <Route path="/*" element={<DynamicPage />} />
      </Routes>
    </Router>
  );
}

export default App;
