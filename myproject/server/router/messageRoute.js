const express = require('express')
const protectRoute = require("../middlewares/protectRoute"); // `.js` əlavə et!
const sendMessage = require("../controllers/messageController.js") ;

const router = express.Router();

router.post("/send/:id", protectRoute, sendMessage);

module.exports= router; 
