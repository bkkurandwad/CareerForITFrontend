import React from "react";
import "../stylesheets/cardsheet.css";

function Card(content) {
  return (
    <div className="card">
      <h2>Card</h2>
      <button
        style={{
          backgroundColor: "blue",
          color: "white",
          borderRadius: "5px",
          position: "absolute",
          marginTop: "300px",
          marginRight: "-140px",
          height: "40px",
          width: "100px",
        }}
      >
        Read More
      </button>
    </div>
  );
}

export default Card;
