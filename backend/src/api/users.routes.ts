import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { prisma } from '../config/prisma-client';
import { ApiError } from '../utils/errors';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User profile management
 */

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Get current user's profile
 *     tags: [Users]
 *     description: Retrieves the profile information of the currently authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The user's profile information.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized. Invalid, missing, or expired access token.
 *       404:
 *         description: Not Found. The user associated with the token could not be found.
 */
router.get('/me', authMiddleware, async (req, res) => {
  // authMiddleware đã xác thực token và gán userId vào req
  const userId = req.userId!;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    // Chọn các trường muốn trả về để không làm lộ thông tin nhạy cảm
    select: {
      id: true,
      email: true,
      name: true,
      avatarUrl: true,
    },
  });

  if (!user) {
    // Trường hợp này rất hiếm khi xảy ra nếu token hợp lệ,
    // nhưng là một bước kiểm tra an toàn cần thiết.
    throw new ApiError(404, 'User not found.');
  }

  res.status(200).json(user);
});

export const usersRouter = router;