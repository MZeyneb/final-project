const express = require('express')

const { getAllUsers, getUserById, deleteUser, postUser, searchUsersByUniversity, getUsersByUniversity } = require('../controllers/userController')
const { updateAvatar } = require('../controllers/userController');
const multer = require('multer');
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()
const upload = multer({ dest: 'uploads/' }); 

router.get("/", getAllUsers)
router.get("/:id", getUserById)
router.delete("/:id", deleteUser)
router.post("/", postUser)
router.get("/university", authMiddleware(["user", "admin"]), getUsersByUniversity);
// router.get("/search", authMiddleware(["user", "admin"]), searchUsersByUniversity);
// router.get("/users/search", async (req, res) => {
//     try {
//       const { university } = req.query;
//       if (!university) {
//         return res.status(400).json({ message: "Universitet adı daxil edilməyib" });
//       }
  
//       const users = await User.find({ university: university });
//       res.json(users);
//     } catch (error) {
//       console.error("Axtarış zamanı xəta:", error);
//       res.status(500).json({ message: "Server xətası" });
//     }
//   });
  
// router.put('/avatar', authMiddleware, upload.single('avatar'), updateAvatar);

module.exports = router