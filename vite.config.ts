import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: '/',
  server: {
    host: true,    // tương đương 0.0.0.0
    port: 5173,    // mặc định, bạn có thể đổi
    strictPort: false, // nếu port đã dùng thì sẽ auto tăng
  },
})
