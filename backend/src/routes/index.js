import express from 'express';
import userRoutes from './userRoutes.js';
import blogRoutes from './blogRoutes.js';
import projectRoutes from './projectRoutes.js';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/blogs', blogRoutes);
router.use('/projects', projectRoutes);

export default router;