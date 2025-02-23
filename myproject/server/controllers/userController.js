const modelUser = require('../models/userModel')

const getAllUsers = async(req, res)=>{
    try {
        const blogs = await modelUser.find()
        res.status(200).json(blogs)
    } catch (error) {
        res.status(500).send({message: error.message})
    }
}

const getUserById = async(req, res)=>{
    const id = req.params.id
    try {
        const blog = await modelUser.findById(id)
        res.status(200).json(blog)
    } catch (error) {
        res.status(500).send({message: error.message})
    }
}
const deleteUser = async(req, res)=>{
    const id = req.params.id

    try {
        const deleted = await modelUser.findByIdAndDelete(id)
        res.status(200).json(deleted)
    } catch (error) {
        res.status(500).send({message: error.message})
    }
}

const postUser = async(req, res)=>{
    try {
        const newBlog = modelUser({...req.body})
        await newBlog.save()
        res.status(200).json(newBlog)
    } catch (error) {
        res.status(500).send({message: error.message})
    }
}

const getUsersByUniversity = async (req, res) => {
    try {

      const userEmail = req.user.email;
  
      const currentUser = await modelUser.findOne({ email: userEmail });
  
      if (!currentUser) {
        return res.status(404).json({ message: "İstifadəçi tapılmadı!" });
      }
  
      const users = await modelUser.find({ 
        university: currentUser.university,
        email: { $ne: userEmail } 
      });
  

      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

const searchUsersByUniversity = async (req, res) => {
    const { university } = req.query;

    if (!university) {
        return res.status(400).json({ message: "Universitet adı daxil edilməlidir!" });
    }

    try {
        const users = await modelUser.find({ university: { $regex: university, $options: "i" } });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = {
    getAllUsers,
    getUserById,
    deleteUser,
    postUser,
    getUsersByUniversity,
    searchUsersByUniversity
}


