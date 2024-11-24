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
      const pdfBlob = await ResumeService.generateResume(formData);
      const pdfURL = URL.createObjectURL(
        new Blob([pdfBlob], { type: "application/pdf" })
      );
      window.open(pdfURL, "_blank");
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
