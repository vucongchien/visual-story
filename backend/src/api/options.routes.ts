import { Router } from 'express';
import { prisma } from '../config/prisma-client';
import { authMiddleware } from '../middleware/auth.middleware';
import { OptionsResponseSchema, OptionsResponse } from '../utils/api-types';

/**
 * @swagger
 * tags:
 *   name: Game Options
 *   description: Retrieve game configuration options
 */

const router = Router();
// GET /api/options
// Yêu cầu xác thực để đảm bảo chỉ người dùng đã đăng nhập mới có thể bắt đầu game
/**
 * @swagger
 * /api/options:
 *   get:
 *     summary: Get available genres and settings for a new game
 *     tags: [Game Options]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of genres and settings
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 genres:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                 settings:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *       401:
 *         description: Unauthorized
 */
router.get('/', authMiddleware, async (req, res) => {
  // Lấy đồng thời cả genres và settings từ database
  const [genres, settings] = await Promise.all([
    prisma.genre.findMany({ orderBy: { name: 'asc' } }),
    prisma.setting.findMany({ orderBy: { name: 'asc' } }),
  ]);

  const responseData: OptionsResponse = { genres, settings };

  res.status(200).json(responseData);
});

export const optionsRouter = router;