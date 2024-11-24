import React, { useState } from "react";
import ResumeService from "../services/ResumeService";
import "../stylesheets/ResumeForm.css";

const ResumeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    education: "",
    experience: "",
    skills: "",
    projects: "",
    achievements: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the API to generate the HTML resume
      const response = await ResumeService.generateResume(formData);
  
      // Create a Blob for the HTML response
      const htmlBlob = new Blob([response], { type: "text/html" });
  
      // Create a URL for the Blob
      const htmlURL = URL.createObjectURL(htmlBlob);
  
      // Create a link to download the file as "resume.html"
      const link = document.createElement("a");
      link.href = htmlURL;
      link.download = "resume.html";
  
      // Trigger the download
      link.click();
  
      // Optionally open the file in a new tab
      window.open(htmlURL, "_blank");
    } catch (error) {
      alert("Error generating resume!");
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        name="name"
        placeholder="Enter your name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <label htmlFor="phone">Phone</label>
      <input
        id="phone"
        name="phone"
        placeholder="Enter your phone number"
        value={formData.phone}
        onChange={handleChange}
        required
      />

      <label htmlFor="education">Education</label>
      <textarea
        id="education"
        name="education"
        placeholder="Describe your education background"
        value={formData.education}
        onChange={handleChange}
        required
      />

      <label htmlFor="experience">Experience</label>
      <textarea
        id="experience"
        name="experience"
        placeholder="List your professional experience"
        value={formData.experience}
        onChange={handleChange}
        required
      />

      <label htmlFor="skills">Skills</label>
      <textarea
        id="skills"
        name="skills"
        placeholder="Mention your key skills"
        value={formData.skills}
        onChange={handleChange}
        required
      />

      <label htmlFor="projects">Projects</label>
      <textarea
        id="projects"
        name="projects"
        placeholder="Provide details of your projects"
        value={formData.projects}
        onChange={handleChange}
        required
      />

      <label htmlFor="achievements">Achievements</label>
      <textarea
        id="achievements"
        name="achievements"
        placeholder="Highlight your achievements"
        value={formData.achievements}
        onChange={handleChange}
        required
      />

      <button type="submit">Generate Resume</button>
    </form>
  );
};

export default ResumeForm;
