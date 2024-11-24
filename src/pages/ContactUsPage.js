import "../stylesheets/ContactUs.css"; // Importing the CSS file
import React from "react";

const ContactUs = () => {
  const team = [
    {
      name: "Bhargav K K",
      position: "Software Engineer",
      company: "Maersk",
      bio: "Passionate about building scalable web solutions.",
      image: "/pics/bkk.jpg",
    },
    {
      name: "H V Lekhana",
      position: "Product Manager",
      company: "JPMC",
      bio: "Expert in managing agile teams and delivering user-centric products.",
      image: "/pics/lekh.jpg",
    },
    {
      name: "Ganavi R",
      position: "UI/UX Designer",
      company: "Oracle",
      bio: "Designing intuitive and aesthetically pleasing interfaces.",
      image: "/pics/gan.jpg",
    },
    {
      name: "JLS Nikitha",
      position: "DevOps Engineer",
      company: "Maersk",
      bio: "Ensuring seamless CI/CD pipelines and server operations.",
      image: "/pics/nik.jpg",
    },
  ];

  return (
    <div className="contact-us-container">
      {/* Feedback Form */}
      <h2>About Us</h2>
      <div className="team-cards-container">
        {team.map((member, index) => (
          <div key={index} className="contact-card">
            <img
              src={member.image}
              alt={member.name}
              className="contact-image"
            />
            <h3 className="contact-name">{member.name}</h3>
            <p className="contact-position">
              {member.position} at {member.company}
            </p>
            <p className="contact-bio">{member.bio}</p>
          </div>
        ))}
      </div>
      <h2>Share Your Feedback</h2>
      <form className="feedback-form">
        <textarea
          className="feedback-textarea"
          placeholder="Enter your feedback or issues here..."
          required
        ></textarea>
        <button type="submit" className="feedback-submit-button">
          Submit Feedback
        </button>
      </form>
      {/* About Us Section */}
    </div>
  );
};

export default ContactUs;
