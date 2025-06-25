# Visual Story – Ứng dụng Kể Chuyện Tương Tác bằng AI

Visual Story là một nền tảng web cho phép người dùng trải nghiệm và sáng tạo các câu chuyện tương tác, nơi cốt truyện được sinh ra linh hoạt bởi trí tuệ nhân tạo (AI). Dự án gồm hai phần chính: Backend (API) và Frontend (giao diện người dùng).

## 🎯 Mục đích & Tác dụng của dự án

- **Giải trí & Sáng tạo:** Mang đến trải nghiệm đọc truyện mới lạ, nơi mỗi lựa chọn của người chơi đều ảnh hưởng đến diễn biến câu chuyện.
- **Ứng dụng AI hiện đại:** Tận dụng sức mạnh của AI (Google Gemini + LangChain) để tạo ra nội dung truyện phong phú, không giới hạn.
- **Hỗ trợ học tập & phát triển kỹ năng:** Thích hợp cho các bạn yêu thích công nghệ, muốn tìm hiểu về tích hợp AI, xây dựng hệ thống web hiện đại.

## 🛠️ Công nghệ sử dụng

### Backend (API)
- **Node.js**, **Express.js**, **TypeScript**
- **Prisma ORM** (PostgreSQL)
- **LangChain.js** + **Google Gemini API** (AI sinh truyện)
- **JWT** (xác thực), **bcrypt** (hash mật khẩu)
- **Zod** (kiểm tra dữ liệu)
- **Swagger UI** (tài liệu API)
- **Docker** & **Docker Compose**

### Frontend (Web UI)
- **React 19**, **TypeScript**, **Tailwind CSS**
- **React Router DOM** (routing)
- **React Context API** (quản lý trạng thái)
- **Framer Motion** (animation)
- **Google OAuth** (đăng nhập)
- **TanStack React Query** (HTTP client)
- **Vite** (build tool)
- **Docker**, **Nginx** (triển khai)

## 📦 Cấu trúc dự án

```
visual-story/
├── backend/   # API, AI, cơ sở dữ liệu
└── frontend/  # Giao diện người dùng
```

## 🚀 Khởi động nhanh

1. **Clone dự án:**
   ```bash
   git clone https://github.com/vucongchien/visual-story/tree/cv
   cd visual-story
   ```
2. **Xem hướng dẫn chi tiết:**
   - [Backend/README.md](./backend/README.md)
   - [Frontend/README.md](./frontend/README.md)

## 📚 Tham khảo nhanh tính năng

- Đăng ký, đăng nhập, quản lý phiên chơi truyện
- Sinh truyện và lựa chọn bằng AI
- Giao diện đẹp, hỗ trợ dark/light mode, hiệu ứng động, âm thanh
- Lưu và tiếp tục các session truyện
- Đăng nhập Google, bảo mật hiện đại

---

**Visual Story – Nơi trí tưởng tượng của bạn được AI chắp cánh!** 