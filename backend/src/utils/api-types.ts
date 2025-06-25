import { z } from 'zod';

/**
 * File này là nguồn chân lý duy nhất cho tất cả các cấu trúc dữ liệu của API.
 * Chúng ta sử dụng Zod để định nghĩa các schema. Từ mỗi schema, chúng ta có thể:
 * 1. Lấy một validator để kiểm tra dữ liệu request lúc chạy (runtime).
 * 2. Suy ra (infer) một kiểu dữ liệu TypeScript để có được sự an toàn kiểu dữ liệu lúc biên dịch (compile-time).
 */

// ==================================
//         AUTHENTICATION
// ==================================

// Schema cho query params của GET /api/auth/google/url
export const GoogleUrlRequestSchema = z.object({
  code_challenge: z.string().min(1, 'code_challenge is required.'),
});
export type GoogleUrlRequestInput = z.infer<typeof GoogleUrlRequestSchema>;

// Schema cho request body của POST /api/auth/google/callback
export const GoogleCallbackRequestSchema = z.object({
  code: z.string().min(1, 'Authorization code is required.'),
  codeVerifier: z.string().min(1, 'Code verifier is required.'),
});
export type GoogleCallbackRequestInput = z.infer<typeof GoogleCallbackRequestSchema>;


// ==================================
//         GAME OPTIONS
// ==================================

// Schema cho một lựa chọn cơ bản (Genre hoặc Setting)
export const OptionSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
});
export type Option = z.infer<typeof OptionSchema>;

// Schema cho response của /options
export const OptionsResponseSchema = z.object({
  genres: z.array(OptionSchema),
  settings: z.array(OptionSchema),
});
export type OptionsResponse = z.infer<typeof OptionsResponseSchema>;

// Schema cho một lựa chọn hiện tại mà người dùng có thể chọn
export const CurrentChoiceSchema = z.object({
  text: z.string(),
});
export type CurrentChoice = z.infer<typeof CurrentChoiceSchema>;

export const TextSegmentSchema = z.object({
  type: z.literal('text'),
  content: z.string(),
});
export const ChoiceSegmentSchema = z.object({
  type: z.literal('choice'),
  choiceText: z.string(),
});
export const StorySegmentSchema = z.discriminatedUnion('type', [
  TextSegmentSchema,
  ChoiceSegmentSchema,
]);
export type StorySegment = z.infer<typeof StorySegmentSchema>;

// ==================================
//         GAME SESSIONS
// ==================================

// Schema cho thông tin chi tiết của một session (dùng trong response)
export const SessionDetailResponseSchema = z.object({
    id: z.string().cuid(),
    title: z.string(),
    genre: z.string(),
    setting: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    status: z.string(),
    story: z.array(StorySegmentSchema),
    currentChoices: z.array(CurrentChoiceSchema),
});
export type SessionDetailResponse  = z.infer<typeof SessionDetailResponseSchema>;


// Schema cho request body khi tạo session mới
export const CreateSessionSchema = z.object({
  genreId: z.string().min(3, 'ID thể loại không hợp lệ'),
  settingId: z.string().min(3, 'ID bối cảnh không hợp lệ'),
});
export type CreateSessionInput = z.infer<typeof CreateSessionSchema>;


// Schema cho request body khi gửi một lựa chọn
export const PostChoiceRequestSchema = z.object({
  // Yêu cầu choiceIndex phải là số nguyên không âm
  choiceIndex: z.number().int().nonnegative(),
});
export type PostChoiceRequestInput = z.infer<typeof PostChoiceRequestSchema>;

// Schema cho response khi GỬI một lựa chọn (POST /api/sessions/:id/choice)
export const PostChoiceResponseSchema = z.object({
  appendedSegments: z.array(StorySegmentSchema), // StorySegmentSchema đã được định nghĩa
  currentChoices: z.array(CurrentChoiceSchema),
  status: z.string(),
});
export type PostChoiceResponse = z.infer<typeof PostChoiceResponseSchema>;

// Schema cho response khi TẠO session mới (POST /api/sessions)
export const CreateSessionResponseSchema = z.object({
  id: z.string().cuid(),
  title: z.string(),
  genre: z.string().cuid(), // Trả về ID
  setting: z.string().cuid(), // Trả về ID
  createdAt: z.date(),
  updatedAt: z.date(),
  status: z.string(),
  story: z.array(TextSegmentSchema), // Story ban đầu chỉ có 1 text segment
  currentChoices: z.array(CurrentChoiceSchema),
});
export type CreateSessionResponse = z.infer<typeof CreateSessionResponseSchema>;


// Schema cho một session tóm tắt (dùng trong list)
export const SessionSummarySchema = z.object({
    id: z.string().cuid(),
    title: z.string(),
    genre: z.string(),
    setting: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    status: z.string(),
});
export type SessionSummary = z.infer<typeof SessionSummarySchema>;

// Schema cho response của GET /api/sessions (danh sách các session)
export const SessionListResponseSchema = z.array(SessionSummarySchema);
export type SessionListResponse = z.infer<typeof SessionListResponseSchema>;