import Blog from '../models/Blog.js';
import User from '../models/User.js';

export const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.findAll({
            include: [{
                model: User,
                as: 'author',
                attributes: ['id', 'username', 'email']
            }]
        });
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findByPk(req.params.id, {
            include: [{
                model: User,
                as: 'author',
                attributes: ['id', 'username', 'email']
            }]
        });
        
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const createBlog = async (req, res) => {
    try {
        const blog = await Blog.create(req.body);
        res.status(201).json({ message: 'Blog created successfully', blog });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const updateBlog = async (req, res) => {
    try {
        const [updated] = await Blog.update(req.body, {
            where: { id: req.params.id }
        });
        
        if (!updated) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        
        const blog = await Blog.findByPk(req.params.id);
        res.status(200).json({ message: 'Blog updated successfully', blog });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const deleteBlog = async (req, res) => {
    try {
        const deleted = await Blog.destroy({
            where: { id: req.params.id }
        });
        
        if (!deleted) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        
        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};