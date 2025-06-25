import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";
import { z } from "zod";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import config from "../config";

// ===================================================================
//      CẤU HÌNH CHUNG
// ===================================================================

// LLM được khởi tạo một lần và tái sử dụng
const llm = new ChatGoogleGenerativeAI({
  apiKey: config.geminiApiKey,
  modelName: "gemini-2.5-flash",
  temperature: 0.7,
});

const continueStorySystemInstruction = `Bạn đang tiếp tục một câu chuyện tiểu thuyết tương tác theo phong cách anime Nhật Bản, viết từ góc nhìn ngôi thứ nhất của nhân vật chính.

Nhiệm vụ của bạn là dựa chặt vào đoạn truyện và các lựa chọn trước đó (toàn bộ lịch sử hội thoại được cung cấp) để tạo ra đoạn truyện *tiếp theo một cách liền mạch và logic*.

**Hãy luôn ghi nhớ và duy trì:**
- **Bối cảnh:** Địa điểm, thời gian, môi trường xung quanh đã được thiết lập.
- **Nhân vật:** Tính cách, suy nghĩ, cảm xúc, trạng thái tâm lý hiện tại của nhân vật chính và các nhân vật khác.
- **Mối quan hệ:** Tương tác, cảm xúc giữa nhân vật chính và các nhân vật phụ dựa trên diễn biến đã qua.
- **Diễn biến cốt truyện:** Các sự kiện, hành động, lời thoại đã xảy ra.

Giọng văn của bạn vẫn cần tinh tế, dẫn dắt cảm xúc, và có chút hài hước nhẹ nhàng theo phong cách anime.

Mỗi đoạn truyện mới phải là sự tiếp nối trực tiếp và hợp lý của đoạn vừa kết thúc. Độ dài khoảng 150–300 từ, linh hoạt theo mạch cảm xúc và diễn biến.

Chỉ tạo ra danh sách lựa chọn (choices) khi có một tình huống đặc biệt, một mâu thuẫn nội tâm/bên ngoài cần giải quyết, hoặc một ngã rẽ quan trọng trong cốt truyện xuất hiện *trong đoạn truyện bạn vừa viết*. Khi đó, hãy đưa ra 2–3 hành động phù hợp với cảm xúc, tính cách của nhân vật chính và *xuất phát trực tiếp từ tình huống hiện tại*.

⚠️ **TUYỆT ĐỐI không đưa ra lựa chọn hoặc tình tiết mâu thuẫn với diễn biến trước đó hoặc không có căn cứ rõ ràng trong bối cảnh hiện tại.** Các hành động được chọn phải là những gì nhân vật chính *có thể và có lý do* để làm trong khoảnh khắc đó.

✅ Mỗi lựa chọn cần đúng thời điểm, phù hợp cảm xúc và logic hoàn cảnh *đã được tạo ra trong đoạn truyện bạn viết và các đoạn trước đó*.

{format_instructions}
`;

// ===================================================================
//      CHAIN 1: DÙNG ĐỂ TẠO CÂU CHUYỆN BAN ĐẦU (CÓ TITLE)
// ===================================================================

const initialStoryOutputSchema = z.object({
  title: z
    .string()
    .describe("Một tiêu đề truyện ngắn gọn, hấp dẫn, phù hợp với đoạn mở đầu."),
  novel_paragraph: z
    .string()
    .describe("Đoạn văn mở đầu câu chuyện, viết từ ngôi thứ nhất."),
  choices: z
    .array(z.string())
    .min(2)
    .max(3)
    .describe("2-3 lựa chọn hành động đầu tiên cho nhân vật chính."),
});

const initialStoryParser = StructuredOutputParser.fromZodSchema(initialStoryOutputSchema);

const initialStorySystemInstruction = `Bạn là một nhà văn sáng tạo, chuyên viết tiểu thuyết tương tác theo phong cách anime Nhật Bản.
Nhiệm vụ của bạn là dựa vào yêu cầu để tạo ra một câu chuyện hấp dẫn từ góc nhìn ngôi thứ nhất.
{format_instructions}`;

const initialStoryPrompt = ChatPromptTemplate.fromMessages([
  ["system", initialStorySystemInstruction],
  ["human", "{user_input}"],
]);

const initialStoryChain = initialStoryPrompt.pipe(llm).pipe(initialStoryParser);

// ===================================================================
//      CHAIN 2: DÙNG ĐỂ TIẾP TỤC CÂU CHUYỆN (KHÔNG CÓ TITLE)
// ===================================================================

const nextStepOutputSchema = z.object({
  novel_paragraph: z
    .string()
    .describe("Một đoạn truyện tiếp theo đoạn trước, viết từ ngôi thứ nhất."),
  choices: z
    .array(z.string())
    .min(2)
    .max(3)
    .describe(
      "2-3 lựa chọn hành động mà nhân vật chính có thể thực hiện, phù hợp với diễn biến truyện."
    ),
});

const nextStepParser = StructuredOutputParser.fromZodSchema(nextStepOutputSchema);

// Sử dụng MessagesPlaceholder để LangChain tự động chèn lịch sử chat vào đúng vị trí.
const nextStepPrompt = ChatPromptTemplate.fromMessages([
  ["system", continueStorySystemInstruction],
  new MessagesPlaceholder("chat_history"),
  ["human", "{user_input}"],
]);

const nextStepChain = nextStepPrompt.pipe(llm).pipe(nextStepParser);


// ===================================================================
//      AI SERVICE CLASS
// ===================================================================

export type ChatHistory = (AIMessage | HumanMessage)[];

class AIService {
  /**
   * Sinh ra câu chuyện ban đầu, bao gồm cả tiêu đề.
   * @param userInput Prompt khởi tạo chứa thể loại và bối cảnh.
   */
  public async generateInitialStory(userInput: string) {
    const response = await initialStoryChain.invoke({
      user_input: userInput,
      format_instructions: initialStoryParser.getFormatInstructions(),
    });
    return response;
  }

  /**
   * Sinh ra đoạn truyện tiếp theo dựa trên lịch sử và lựa chọn của người dùng.
   * @param history Lịch sử các đoạn truyện và lựa chọn trước đó (dạng mảng các object AIMessage/HumanMessage).
   * @param userInput Lựa chọn hiện tại của người dùng.
   */
  public async generateNextStep(history: ChatHistory, userInput: string) {
    const response = await nextStepChain.invoke({
      chat_history: history,
      user_input: userInput,
      format_instructions: nextStepParser.getFormatInstructions(),
    });

    return response;
  }
}

// Chỉ export một lần duy nhất
export const aiService = new AIService();