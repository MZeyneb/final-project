
const Forum = require("../models/forumModel");
const modelUser = require("../models/userModel");


const createQuestion = async (req, res) => {
  try {
    const { question } = req.body;
    const userId = req.user.id;
    const user = await modelUser.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "İstifadəçi tapılmadı!" });
    }

    const newQuestion = new Forum({
      userId,
      university: user.university,
      question,
    });

    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addAnswer = async (req, res) => {
  try {
    const { questionId, answer } = req.body;
    const userId = req.user.id;

    const question = await Forum.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: "Sual tapılmadı!" });
    }

    question.answers.push({ userId, answer });
    await question.save();

    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getQuestionsByUniversity = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await modelUser.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "İstifadəçi tapılmadı!" });
    }

    const questions = await Forum.find({ university: user.university })
      .populate("userId", "name avatar")
      .populate("answers.userId", "name avatar");

    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createQuestion, addAnswer, getQuestionsByUniversity };