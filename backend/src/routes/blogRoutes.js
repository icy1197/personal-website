/**
 * @swagger
 * tags:
 *   name: Blogs
 *   description: 博客管理接口
 */
import express from 'express';
import { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog } from '../controllers/blogController.js';

const router = express.Router();

/**
 * @swagger
 * /api/blogs:
 *   get:
 *     summary: 获取所有博客
 *     tags: [Blogs]
 *     responses:
 *       200:
 *         description: 获取成功
 */
router.get('/', getBlogs);

/**
 * @swagger
 * /api/blogs/{id}:
 *   get:
 *     summary: 根据ID获取博客
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 博客ID
 *     responses:
 *       200:
 *         description: 获取成功
 *       404:
 *         description: 博客不存在
 */
router.get('/:id', getBlogById);

/**
 * @swagger
 * /api/blogs:
 *   post:
 *     summary: 创建博客
 *     tags: [Blogs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - authorId
 *             properties:
 *               title:
 *                 type: string
 *                 description: 博客标题
 *               content:
 *                 type: string
 *                 description: 博客内容
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: 标签列表
 *               authorId:
 *                 type: integer
 *                 description: 作者ID
 *     responses:
 *       201:
 *         description: 创建成功
 */
router.post('/', createBlog);

/**
 * @swagger
 * /api/blogs/{id}:
 *   put:
 *     summary: 更新博客
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 博客ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: 博客标题
 *               content:
 *                 type: string
 *                 description: 博客内容
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: 标签列表
 *     responses:
 *       200:
 *         description: 更新成功
 *       404:
 *         description: 博客不存在
 */
router.put('/:id', updateBlog);

/**
 * @swagger
 * /api/blogs/{id}:
 *   delete:
 *     summary: 删除博客
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 博客ID
 *     responses:
 *       200:
 *         description: 删除成功
 *       404:
 *         description: 博客不存在
 */
router.delete('/:id', deleteBlog);

export default router;