const express = require('express')
const {
    getAllBlogs,
    getBlogById,
    deleteBlog,
    postBlog
} = require('../controllers/index')
const authMiddleware = require('../middlewares/authMiddleware')
console.log(typeof authMiddleware); 
console.log(authMiddleware(["user", "admin"])); 
const router = express.Router()

router.get("/", authMiddleware(["user", "admin"]), getAllBlogs);
router.get("/:id", authMiddleware(["user", "admin"]), getBlogById)
router.delete("/:id", authMiddleware(["admin"]), deleteBlog)
router.post("/", authMiddleware(["admin"]), postBlog)


module.exports = router