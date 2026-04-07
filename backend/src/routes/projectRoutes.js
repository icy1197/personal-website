/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: 项目管理接口
 */
import express from 'express';
import { getProjects, getProjectById, createProject, updateProject, deleteProject } from '../controllers/projectController.js';

const router = express.Router();

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: 获取所有项目
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: 获取成功
 */
router.get('/', getProjects);

/**
 * @swagger
 * /api/projects/{id}:
 *   get:
 *     summary: 根据ID获取项目
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 项目ID
 *     responses:
 *       200:
 *         description: 获取成功
 *       404:
 *         description: 项目不存在
 */
router.get('/:id', getProjectById);

/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: 创建项目
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *                 description: 项目标题
 *               description:
 *                 type: string
 *                 description: 项目描述
 *               technologies:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: 技术栈
 *               githubUrl:
 *                 type: string
 *                 description: GitHub链接
 *               demoUrl:
 *                 type: string
 *                 description: 演示链接
 *               imageUrl:
 *                 type: string
 *                 description: 项目图片
 *     responses:
 *       201:
 *         description: 创建成功
 */
router.post('/', createProject);

/**
 * @swagger
 * /api/projects/{id}:
 *   put:
 *     summary: 更新项目
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 项目ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: 项目标题
 *               description:
 *                 type: string
 *                 description: 项目描述
 *               technologies:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: 技术栈
 *               githubUrl:
 *                 type: string
 *                 description: GitHub链接
 *               demoUrl:
 *                 type: string
 *                 description: 演示链接
 *               imageUrl:
 *                 type: string
 *                 description: 项目图片
 *     responses:
 *       200:
 *         description: 更新成功
 *       404:
 *         description: 项目不存在
 */
router.put('/:id', updateProject);

/**
 * @swagger
 * /api/projects/{id}:
 *   delete:
 *     summary: 删除项目
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 项目ID
 *     responses:
 *       200:
 *         description: 删除成功
 *       404:
 *         description: 项目不存在
 */
router.delete('/:id', deleteProject);

export default router;