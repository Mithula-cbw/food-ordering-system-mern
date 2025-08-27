import React from "react";
import "./Animation.css";

const AnimatedText = ({ text }) => {
  const letters = text.split("");

  return (
    <div className="typing-container">
      {letters.map((letter, index) => (
        <span
          key={index}
          className={letter === " " ? "space" : ""}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {letter}
        </span>
      ))}
    </div>
  );
};

export default function App() {
  return (
    <div>
      <AnimatedText text="Here Is The DashBoard & Admin Panel for Admins." />
    </div>
  );
}
