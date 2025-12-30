 import React, { useState } from "react";
import "./FormCss.css";

function PostQuestionForm() {
  const [formData, setFormData] = useState({
    question: "",
    options: {
      A: "",
      B: "",
      C: "",
      D: "",
    },
    correctAnswer: "A",
    topic: "General",
  });

  const [responseMessage, setResponseMessage] = useState("");

  const topics = [
    "General",
    "Robotics",
    "AI",
    "WebDevelopment",
    "EmbeddedSystems",
    "Other",
  ];

  // ----------------------------
  // Handlers
  // ----------------------------
  const handleQuestionChange = (e) => {
    setFormData({ ...formData, question: e.target.value });
  };

  const handleOptionChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      options: {
        ...prev.options,
        [name]: value,
      },
    }));
  };

  const handleCorrectAnswerChange = (e) => {
    setFormData({ ...formData, correctAnswer: e.target.value });
  };

  const handleTopicChange = (e) => {
    setFormData({ ...formData, topic: e.target.value });
  };

  // ----------------------------
  // Submit
  // ----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/post-question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setResponseMessage("✅ MCQ posted successfully!");
        setFormData({
          question: "",
          options: { A: "", B: "", C: "", D: "" },
          correctAnswer: "A",
          topic: "General",
        });
      } else {
        setResponseMessage(`❌ Error: ${data.message}`);
      }
    } catch (err) {
      setResponseMessage("❌ Server error while posting question.");
    }
  };

  // ----------------------------
  // UI
  // ----------------------------
  return (
    <div style={{ margin: "20px", maxWidth: "600px" }}>
      <div className="ProperName"> 
      <h2>Submit MCQ Question</h2>

      <form onSubmit={handleSubmit}>
        {/* Question */}
        <div>
          <label>Question:</label>
          <textarea
            value={formData.question}
            onChange={handleQuestionChange}
            required
          />
        </div>

        {/* Options */}
        {["A", "B", "C", "D"].map((opt) => (
          <div key={opt}>
            <label>Option {opt}:</label>
            <input
              type="text"
              name={opt}
              value={formData.options[opt]}
              onChange={handleOptionChange}
              required
            />
          </div>
        ))}

        {/* Correct Answer */}
        <div style={{ marginTop: "10px" }}>
          <label>Correct Answer:</label>
          <div>
            {["A", "B", "C", "D"].map((opt) => (
              <label key={opt} style={{ marginRight: "15px" }}>
                <input
                  type="radio"
                  value={opt}
                  checked={formData.correctAnswer === opt}
                  onChange={handleCorrectAnswerChange}
                />
                {opt}
              </label>
            ))}
          </div>
        </div>

        {/* Topic */}
        <div>
          <label>Topic:</label>
          <select value={formData.topic} onChange={handleTopicChange}>
            {topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" style={{ marginTop: "12px" }}>
          Submit MCQ
        </button>
      </form>

      {responseMessage && <p>{responseMessage}</p>}
      </div>
    </div>
  );
}

export default PostQuestionForm;



