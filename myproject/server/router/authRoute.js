const express = require('express')
const {register, login, googleLogin} = require('../controllers/authController')
const router = express.Router()
const admin = require("firebase-admin");


router.post("/register", register)
router.post("/login", login)
router.post('/google', async (req, res) => {
  try {
    const { email, name, avatar } = req.body;

    
    const user = await admin.auth().getUserByEmail(email);

   
    const token = await admin.auth().createCustomToken(user.uid);
    res.json({ token });
  } catch (error) {

    if (error.code === 'auth/user-not-found') {
      return res.status(404).json({ message: "Bu email ilə qeydiyyat yoxdur!" });
    }
    console.error("Google Auth error:", error);
    res.status(500).json({ message: "Google Auth xətası" });
  }
});

module.exports = router