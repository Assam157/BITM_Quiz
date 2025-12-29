import React, { useState } from "react";
import "./FormCss.css";

function PostQuestionForm() {
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    topic: "General", // default topic
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

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://bitm-quizbackend.onrender.com/post-question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setResponseMessage("Question posted successfully!");
        setFormData({
          question: "",
          answer: "",
          topic: "General",
        });
      } else {
        setResponseMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setResponseMessage("An error occurred while posting the question.");
    }
  };

  return (
    <div style={{ margin: "20px" }}>
      <h2>Submit a Question</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Question:</label>
          <textarea
            name="question"
            value={formData.question}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Answer:</label>
          <textarea
            name="answer"
            value={formData.answer}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Topic:</label>
          <select
            name="topic"
            value={formData.topic}
            onChange={handleChange}
          >
            {topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" style={{ marginTop: "10px" }}>
          Submit Question
        </button>
      </form>

      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}

export default PostQuestionForm;

