import React, { useEffect, useState } from "react";
import "./FormCss.css";

function ManageQuestions() {
  const [questions, setQuestions] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState(null);
  const [topicFilter, setTopicFilter] = useState("All");

  const topics = [
    "All",
    "General",
    "Robotics",
    "AI",
    "WebDevelopment",
    "EmbeddedSystems",
    "Other",
  ];

  // ----------------------------
  // Fetch Questions
  // ----------------------------
  const fetchQuestions = async () => {
    const url =
      topicFilter === "All"
        ? "https://bitm-quizbackend.onrender.com/get-questions"
        : `https://bitm-quizbackend.onrender.com/get-questions?topic=${topicFilter}`;

    const res = await fetch(url);
    const data = await res.json();
    if (data.success) setQuestions(data.questions);
  };

  useEffect(() => {
    fetchQuestions();
  }, [topicFilter]);

  // ----------------------------
  // Edit Handlers
  // ----------------------------
  const startEdit = (q) => {
    setEditingId(q._id);
    setEditData(JSON.parse(JSON.stringify(q)));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    if (["A", "B", "C", "D"].includes(name)) {
      setEditData((prev) => ({
        ...prev,
        options: { ...prev.options, [name]: value },
      }));
    } else {
      setEditData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const saveEdit = async () => {
    await fetch(`https://bitm-quizbackend.onrender.com/update-question/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editData),
    });

    setEditingId(null);
    setEditData(null);
    fetchQuestions();
  };

  // ----------------------------
  // Delete
  // ----------------------------
  const deleteQuestion = async (id) => {
    if (!window.confirm("Delete this question?")) return;

    await fetch(`https://bitm-quizbackend.onrender.com/delete-question/${id}`, {
      method: "DELETE",
    });

    fetchQuestions();
  };

  // ----------------------------
  // UI
  // ----------------------------
  return (
    <div style={{ padding: "20px" }}>
      <h2>Manage Questions</h2>

      {/* Topic Filter */}
      <select
        value={topicFilter}
        onChange={(e) => setTopicFilter(e.target.value)}
      >
        {topics.map((t) => (
          <option key={t}>{t}</option>
        ))}
      </select>

      <hr />

      {questions.map((q) => (
        <div key={q._id} className="question-card">
          {editingId === q._id ? (
            <>
              <textarea
                name="question"
                value={editData.question}
                onChange={handleEditChange}
              />

              {["A", "B", "C", "D"].map((opt) => (
                <input
                  key={opt}
                  name={opt}
                  value={editData.options[opt]}
                  onChange={handleEditChange}
                  placeholder={`Option ${opt}`}
                />
              ))}

              <div>
                Correct:
                {["A", "B", "C", "D"].map((opt) => (
                  <label key={opt} style={{ marginLeft: "10px" }}>
                    <input
                      type="radio"
                      name="correctAnswer"
                      value={opt}
                      checked={editData.correctAnswer === opt}
                      onChange={handleEditChange}
                    />
                    {opt}
                  </label>
                ))}
              </div>

              <select
                name="topic"
                value={editData.topic}
                onChange={handleEditChange}
              >
                {topics
                  .filter((t) => t !== "All")
                  .map((t) => (
                    <option key={t}>{t}</option>
                  ))}
              </select>

              <button onClick={saveEdit}>💾 Save</button>
              <button onClick={() => setEditingId(null)}>❌ Cancel</button>
            </>
          ) : (
            <>
              <h4>{q.question}</h4>
              <ul>
                {Object.entries(q.options).map(([k, v]) => (
                  <li key={k}>
                    {k}. {v}
                  </li>
                ))}
              </ul>
              <p>
                <b>Correct:</b> {q.correctAnswer} | <b>Topic:</b> {q.topic}
              </p>

              <button onClick={() => startEdit(q)}>✏️ Edit</button>
              <button onClick={() => deleteQuestion(q._id)}>🗑️ Delete</button>
            </>
          )}
          <hr />
        </div>
      ))}
    </div>
  );
}

export default ManageQuestions;



