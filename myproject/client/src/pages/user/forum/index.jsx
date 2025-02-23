// pages/Forum.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../context/authContext"
import styles from "./index.module.scss";

const Forum = () => {
  const { user, token } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");


const fetchQuestions = async () => {
  try {
    const token = localStorage.getItem("token"); 
    console.log("Token:", token); 

    if (!token) {
      console.error("Token tapılmadı!");
      return;
    }

    const res = await axios.get("http://localhost:5005/forum/questions", {
      headers: { Authorization: `Bearer ${token}` }, 
    });
    setQuestions(res.data);
  } catch (error) {
    console.error("Xəta:", error.response?.data?.message || error.message);
  }
};


  const handleCreateQuestion = async () => {
    try {
      await axios.post(
        "http://localhost:5005/forum/create-question",
        { question: newQuestion },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewQuestion("");
      fetchQuestions();
    } catch (error) {
      console.error("Xəta:", error.response?.data?.message || error.message);
    }
  };

  const handleAddAnswer = async (questionId) => {
    try {
      await axios.post(
        "http://localhost:5005/forum/add-answer",
        { questionId, answer: newAnswer },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewAnswer("");
      fetchQuestions();
    } catch (error) {
      console.error("Xəta:", error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className={styles.forumContainer}>
      <h2>Forum</h2>

      <div className={styles.questionForm}>
        <textarea
          placeholder="Sualınızı yazın..."
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
        />
        <button onClick={handleCreateQuestion}>Sual Ver</button>
      </div>

      <div className={styles.questionsList}>
        {questions.map((question) => (
          <div key={question._id} className={styles.questionItem}>
            <div className={styles.questionHeader}>
              <img src={question.userId.avatar} alt={question.userId.name} />
              <h3>{question.userId.name}</h3>
            </div>
            <p>{question.question}</p>

            <div className={styles.answersList}>
              {question.answers.map((answer) => (
                <div key={answer._id} className={styles.answerItem}>
                  <div className={styles.answerHeader}>
                    <img src={answer.userId.avatar} alt={answer.userId.name} />
                    <h4>{answer.userId.name}</h4>
                  </div>
                  <p>{answer.answer}</p>
                </div>
              ))}
            </div>

            <div className={styles.answerForm}>
              <textarea
                placeholder="Cavab yazın..."
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
              />
              <button onClick={() => handleAddAnswer(question._id)}>Cavab Yaz</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forum;