const express = require("express");
const router = express.Router();
const {
  createQuestion,
  addAnswer,
  getQuestionsByUniversity,
} = require("../controllers/forumController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/create-question", authMiddleware(["user", "admin"]), createQuestion);
router.post("/add-answer", authMiddleware(["user", "admin"]), addAnswer);
router.get("/questions", authMiddleware(["user", "admin"]), getQuestionsByUniversity);

module.exports = router;