// models/forumModel.js
const mongoose = require("mongoose");

const forumSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    university: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    answers: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        answer: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

const Forum = mongoose.model("Forum", forumSchema);

module.exports = Forum;