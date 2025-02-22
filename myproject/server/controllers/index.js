    const modelBlog = require('../models/index')
    const jwt = require('jsonwebtoken')
    const dotenv = require('dotenv');
    dotenv.config()

    const getAllBlogs = async(req, res)=>{
        try {            
            const blogs = await modelBlog.find()
            res.status(200).json(blogs)
        } catch (error) {
            res.status(500).send({message: error.message})
        }
    }

    const getBlogById = async(req, res)=>{
        const id = req.params.id
        try {
            const blog = await modelBlog.findById(id)
            res.status(200).json(blog)
        } catch (error) {
            res.status(500).send({message: error.message})
        }
    }
    const deleteBlog = async(req, res)=>{
        const id = req.params.id

        try {
            const deleted = await modelBlog.findByIdAndDelete(id)
            res.status(200).json(deleted)
        } catch (error) {
            res.status(500).send({message: error.message})
        }
    }

    const postBlog = async(req, res)=>{
        try {
            const newBlog = modelBlog({...req.body})
            await newBlog.save()
            res.status(200).json(newBlog)
        } catch (error) {
            res.status(500).send({message: error.message})
        }
    }

    module.exports = {
        getAllBlogs,
        getBlogById,
        deleteBlog,
        postBlog
    }