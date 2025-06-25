import { Router } from 'express';
import { z } from 'zod';
import { AIMessage, HumanMessage } from '@langchain/core/messages';

import { prisma } from '../config/prisma-client';
import { authMiddleware } from '../middleware/auth.middleware';
import { validateRequest } from '../middleware/validation.middleware';
import { aiService, ChatHistory } from '../services/ai.service';
import { ApiError } from '../utils/errors';
import { CreateSessionSchema, CreateSessionInput, PostChoiceRequestSchema, PostChoiceResponse, PostChoiceRequestInput } from '../utils/api-types';
import { SessionListResponse, CreateSessionResponse, SessionDetailResponse } from '../utils/api-types';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Game Sessions
 *   description: API for managing game sessions
 */

/**
 * @swagger
 * /api/sessions:
 *   post:
 *     summary: Create a new game session
 *     tags: [Game Sessions]
 *     description: |
 *       Starts a new novel session based on user-selected options.
 *       The system will generate an initial story paragraph, a compelling title, and the first set of choices.
 *       The response contains the full state of the newly created session, ready for the frontend to render and start the game.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - genreId
 *               - settingId
 *             properties:
 *               genreId:
 *                 type: string
 *                 description: The ID of the genre, obtained from `GET /api/options`
 *                 example: "clw9h3j1z0000a4b8c2d6e8f4"
 *               settingId:
 *                 type: string
 *                 description: The ID of the setting, obtained from `GET /api/options`
 *                 example: "clw9h3k2a0001a4b8d4e6f8g2"
 *     responses:
 *       201:
 *         description: Session created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "session-ghi-789"
 *                 title:
 *                   type: string
 *                   example: "Khởi đầu mới"
 *                 genre:
 *                   type: string
 *                   description: "The ID of the genre"
 *                   example: "clw9h3j1z0000a4b8c2d6e8f4"
 *                 setting:
 *                   type: string
 *                   description: "The ID of the setting"
 *                   example: "clw9h3k2a0001a4b8d4e6f8g2"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                 status:
 *                   type: string
 *                   example: "in_progress"
 *                 story:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                         example: "text"
 *                       content:
 *                         type: string
 *                         example: "Đây là đoạn tiểu thuyết mở đầu..."
 *                 currentChoices:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       text:
 *                         type: string
 *                         example: "Lựa chọn A ban đầu."
 *       400:
 *         description: Bad Request. Invalid genreId or settingId format, or missing fields.
 *       401:
 *         description: Unauthorized. Invalid or missing token.
 *       404:
 *         description: Not Found. The provided genreId or settingId does not exist.
 *       500:
 *         description: Internal Server Error. Failed to generate content from the AI service.
 */
router.post(
  '/',
  authMiddleware,
  validateRequest(z.object({ body: CreateSessionSchema })),
  async (req, res) => {
    const { genreId, settingId } : CreateSessionInput = req.body;
    const userId = req.userId!;

    const [genre, setting] = await Promise.all([
      prisma.genre.findUnique({ where: { id: genreId } }),
      prisma.setting.findUnique({ where: { id: settingId } }),
    ]);

    if (!genre || !setting) {
      throw new ApiError(404, 'Không tìm thấy Thể loại hoặc Bối cảnh.');
    }

    const initialPrompt = `
    Bắt đầu một câu chuyện tiểu thuyết tình cảm lãng mạn mới.
    Thể loại: ${genre.name}.
    Bối cảnh: ${setting.name}.
    Hãy tự nghĩ ra một tiêu đề thật hấp dẫn, viết đoạn mở đầu lôi cuốn và đưa ra một vài lựa chọn tiếp theo.`;

    const aiResponse = await aiService.generateInitialStory(initialPrompt);

    const newSession = await prisma.session.create({
      data: {
        title: aiResponse.title,
        userId,
        genreId,
        settingId,
        // Lưu các lựa chọn đầu tiên vào trường JSON
        currentChoices: aiResponse.choices.map(choice => ({ text: choice })),
        // Tạo phân đoạn câu chuyện đầu tiên
        story: {
          create: {
            type: 'TEXT',
            content: aiResponse.novel_paragraph,
          },
        },
      },
      // Lấy lại story segment vừa tạo để đưa vào response
      include: {
        story: {
          select: { type: true, content: true }
        }
      },
    });

    if (newSession.story.length === 0 || newSession.story[0].type !== 'TEXT') {
        // Thêm một bước kiểm tra an toàn phòng trường hợp logic thay đổi
        throw new ApiError(500, 'Không thể tạo phân đoạn câu chuyện mở đầu.');
    }

     // 4. Định dạng response cuối cùng để khớp với tài liệu
    const responeData: CreateSessionResponse = {
      id: newSession.id,
      title: newSession.title,
      genre: newSession.genreId, // Trả về ID như yêu cầu
      setting: newSession.settingId, // Trả về ID như yêu cầu
      createdAt: newSession.createdAt,
      updatedAt: newSession.updatedAt,
      status: newSession.status,
      story: [
        {
          type: 'text', // Chuyển 'TEXT' thành 'text' để khớp với tài liệu
          content: newSession.story[0].content,
        }
      ],
      // Lấy currentChoices từ bản ghi đã lưu, đảm bảo nó là một mảng
      currentChoices: (newSession.currentChoices as any[] | null) || [],
    };

    res.status(201).json(responeData);
  }
);

/**
 * @swagger
 * /api/sessions/{sessionId}/choice:
 *   post:
 *     summary: Submit a player's choice and get the next story part
 *     tags: [Game Sessions]
 *     description: |
 *       Submits the index of the choice selected by the player.
 *       The system processes this choice, updates the session history, and generates the next story segment and choices.
 *       The response provides only the newly appended segments for the frontend to add to its state.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the session to interact with.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - choiceIndex
 *             properties:
 *               choiceIndex:
 *                 type: integer
 *                 description: The 0-based index of the choice selected from the previous `currentChoices` array.
 *                 example: 0
 *     responses:
 *       200:
 *         description: Choice processed successfully. Returns new segments to append and new choices.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 appendedSegments:
 *                   type: array
 *                   description: "An array of new segments to append to the frontend's story array."
 *                   items:
 *                     $ref: '#/components/schemas/StorySegment'
 *                 currentChoices:
 *                   type: array
 *                   description: "The new set of choices for the latest story segment."
 *                   items:
 *                     $ref: '#/components/schemas/CurrentChoice'
 *                 status:
 *                   type: string
 *                   description: "The updated status of the session."
 *                   example: "in_progress"
 *       400:
 *         description: Bad Request. The choiceIndex is invalid or the session is not in 'in_progress' state.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Not Found. The session does not exist or does not belong to the user.
 *       500:
 *         description: Internal Server Error. The AI service failed to generate the next step.
 */
router.post(
  '/:sessionId/choice',
  authMiddleware,
  validateRequest(z.object({ body: PostChoiceRequestSchema })),
  async (req, res) => {
    const { sessionId } = req.params;
    const { choiceIndex } = req.body as PostChoiceRequestInput;
    const userId = req.userId!;

    // 1. Lấy session hiện tại từ DB
    const session = await prisma.session.findFirst({
      where: { id: sessionId, userId },
      include: { story: { orderBy: { createdAt: 'asc' } } },
    });

    if (!session) {
      throw new ApiError(404, 'Không tìm thấy phiên chơi hoặc bạn không có quyền truy cập.');
    }

    if (session.status !== 'in_progress') {
      throw new ApiError(400, 'Phiên chơi này đã kết thúc.');
    }

   // 2. Xác thực choiceIndex
    const previousChoices = (session.currentChoices as any[] | null) || [];
    if (choiceIndex < 0 || choiceIndex >= previousChoices.length) {
      throw new ApiError(400, 'Chỉ mục lựa chọn không hợp lệ.');
    }
    const choiceText = previousChoices[choiceIndex].text;

    // 3. Tái tạo lịch sử chat để gửi cho AI
    const history: ChatHistory = [];
    for (const segment of session.story) {
      if (segment.type === 'TEXT') {
        history.push(new AIMessage(segment.content));
      } else {
        history.push(new HumanMessage(`Lựa chọn của tôi: "${segment.content}"`));
      }
    }

    // 4. Gọi AI service để lấy kết quả tiếp theo
    const aiResponse = await aiService.generateNextStep(history, choiceText);

    // 5. Xác định trạng thái mới của game
    const newStatus = aiResponse.choices.length > 0 ? 'in_progress' : 'finished';

    // 6. Cập nhật database trong một transaction
    await prisma.$transaction([
      // a. Lưu lựa chọn của người dùng vào lịch sử
      prisma.storySegment.create({
        data: { sessionId, type: 'CHOICE', content: choiceText },
      }),
      // b. Lưu đoạn văn mới của AI vào lịch sử
      prisma.storySegment.create({
        data: {
          sessionId,
          type: 'TEXT',
          content: aiResponse.novel_paragraph,
        },
      }),
      // c. Cập nhật session với các lựa chọn mới và trạng thái mới
      prisma.session.update({
        where: { id: sessionId },
        data: {
          currentChoices: aiResponse.choices.map(choice => ({ text: choice })),
          status: newStatus,
        },
      }),
    ]);

    const responseData: PostChoiceResponse = {
      appendedSegments: [
        {
          type: 'choice',
          choiceText: choiceText,
        },
        {
          type: 'text',
          content: aiResponse.novel_paragraph,
        },
      ],
      currentChoices: aiResponse.choices.map(choice => ({ text: choice })),
      status: newStatus,
    };

    res.status(200).json(responseData);
  }
);

/**
 * @swagger
 * /api/sessions:
 *   get:
 *     summary: Get a list of all game sessions for the current user (Dashboard)
 *     tags: [Game Sessions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: An array of session summaries.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "clw9h3j1z0000a4b8c2d6e8f4"
 *                   title:
 *                     type: string
 *                     example: "Cuộc phiêu lưu trong rừng sâu"
 *                   genre:
 *                     type: string
 *                     example: "fantasy"
 *                   setting:
 *                     type: string
 *                     example: "forest"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                   status:
 *                     type: string
 *                     example: "in_progress"
 *       401:
 *         description: Unauthorized
 */
router.get('/', authMiddleware, async (req, res) => {
    const userId = req.userId!;

    // 1. Lấy dữ liệu từ database
    // Chúng ta dùng `include` để lấy thông tin từ các bảng liên quan (Genre và Setting)
    const sessionsFromDb = await prisma.session.findMany({
        where: { userId },
        include: {
            genre: {
                select: { name: true }
            },
            setting: {
                select: { name: true }
            }
        },
        orderBy: {
            updatedAt: 'desc',
        },
    });

    // 2. Định dạng lại dữ liệu để khớp với response mong muốn
    // Kết quả từ Prisma sẽ là: { ..., genre: { name: 'fantasy' }, setting: { name: 'forest' } }
    // Chúng ta cần chuyển nó thành: { ..., genre: 'fantasy', setting: 'forest' }
    const responeData: SessionListResponse = sessionsFromDb.map(session => ({
        id: session.id,
        title: session.title,
        genre: session.genre.name,
        setting: session.setting.name,
        createdAt: session.createdAt,
        updatedAt: session.updatedAt,
        status: session.status,
    }));

    // 3. Trả về response đã được định dạng
    res.status(200).json(responeData);
});

/**
 * @swagger
 * /api/sessions/{id}:
 *   get:
 *     summary: Get details of a specific game session to continue playing
 *     tags: [Game Sessions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The session ID
 *     responses:
 *       200:
 *         description: |
 *           Successful operation. Returns the full story history and the current available choices.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id: { type: 'string' }
 *                 title: { type: 'string' }
 *                 status: { type: 'string' }
 *                 createdAt: { type: 'string', format: 'date-time' }
 *                 updatedAt: { type: 'string', format: 'date-time' }
 *                 genre: { $ref: '#/components/schemas/Option' }
 *                 setting: { $ref: '#/components/schemas/Option' }
 *                 story:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/StorySegment'
 *                 currentChoices:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       text:
 *                         type: string
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Session not found
 */
router.get('/:id', authMiddleware, async (req, res) => {
    const { id: sessionId } = req.params;
    const userId = req.userId!;

    const session = await prisma.session.findFirst({
        where: { id: sessionId, userId },
        include: {
            story: {
                // Đổi tên 'choiceText' thành 'content' để nhất quán
                select: { type: true, content: true },
                orderBy: { createdAt: 'asc' }
            },
            genre: { select: { id: true, name: true } },
            setting: { select: { id: true, name: true } },
        },
    });

    if (!session) {
        throw new ApiError(404, 'Không tìm thấy phiên chơi hoặc bạn không có quyền truy cập.');
    }

    // Chuyển đổi story để khớp với định dạng response mong muốn
    const formattedStory = session.story.map(segment => {
        if (segment.type === 'CHOICE') {
            return { type: 'choice', choiceText: segment.content };
        }
        return { type: 'text', content: segment.content };
    });

    // Tạo response cuối cùng
    const responseData: SessionDetailResponse = {
        id: session.id,
        title: session.title,
        genre: session.genre.name,
        setting: session.setting.name,
        createdAt: session.createdAt,
        updatedAt: session.updatedAt,
        status: session.status,
        story: formattedStory as ({ type: "text"; content: string } | { type: "choice"; choiceText: string })[],
        currentChoices: (session.currentChoices as any[] | null) || [],
    };

    res.status(200).json(responseData);
});

/**
 * @swagger
 * /api/sessions/{sessionId}:
 *   delete:
 *     summary: Delete a game session
 *     tags: [Game Sessions]
 *     description: Permanently deletes a game session and all of its related story segments.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the session to be deleted.
 *     responses:
 *       200:
 *         description: Session deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Session deleted successfully."
 *       401:
 *         description: Unauthorized. Invalid or missing token.
 *       403:
 *         description: Forbidden. The user does not have permission to delete this session.
 *       404:
 *         description: Not Found. No session found with the provided ID.
 */
router.delete('/:sessionId', authMiddleware, async (req, res) => {
    const { sessionId } = req.params;
    const userId = req.userId!;

    // 1. Tìm session để kiểm tra sự tồn tại và quyền sở hữu
    const session = await prisma.session.findUnique({
        where: { id: sessionId },
    });

    // 2. Nếu không tồn tại, trả về lỗi 404
    if (!session) {
        throw new ApiError(404, 'Không tìm thấy phiên chơi.');
    }

    // 3. Nếu không thuộc sở hữu của người dùng, trả về lỗi 403
    if (session.userId !== userId) {
        throw new ApiError(403, 'Bạn không có quyền xóa phiên chơi này.');
    }

    // 4. Nếu mọi thứ hợp lệ, tiến hành xóa
    // Prisma sẽ tự động xóa các StorySegment liên quan (cascading delete)
    await prisma.session.delete({
        where: { id: sessionId },
    });

    // 5. Trả về thông báo thành công
    res.status(200).json({ message: 'Session deleted successfully.' });
});


export const sessionsRouter = router;