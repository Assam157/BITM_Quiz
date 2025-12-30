import "./App.css";
import { useState } from "react";

import PostQuestionForm from "./components/QuestionSubmittingForm";
import ManageQuestions from "./components/ManageQuestions";

function App() {
  const [page, setPage] = useState("submit");

  return (
    <div className="App">
      {/* Navigation */}
      <div style={navStyle}>
        <button
          style={page === "submit" ? activeBtn : btn}
          onClick={() => setPage("submit")}
        >
          ➕ Submit Question
        </button>

        <button
          style={page === "manage" ? activeBtn : btn}
          onClick={() => setPage("manage")}
        >
          ✏️ Edit / Delete Questions
        </button>
      </div>

      {/* Page Render */}
      <div style={{ marginTop: "20px" }}>
        
        {page === "submit" && <PostQuestionForm />}
        {page === "manage" && <ManageQuestions />}
      </div>
    </div>
  );
}

/* -------------------- Styles -------------------- */
const navStyle = {
  display: "flex",
  justifyContent: "center",
  gap: "15px",
  marginTop: "20px",
};

const btn = {
  padding: "10px 18px",
  fontSize: "14px",
  cursor: "pointer",
};

const activeBtn = {
  ...btn,
  backgroundColor: "#4caf50",
  color: "white",
};

export default App;

