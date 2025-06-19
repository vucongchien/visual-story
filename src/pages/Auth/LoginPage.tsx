import React, { useState } from "react";
import { Button } from "../../components";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { AuthLayout } from "../../layouts/AuthLayout";
import { useLoading } from "../../hooks/useLoading";
import { useGoogleLogin } from "@react-oauth/google";
import Circle from "../../components/textdrag";
import { generatePkceChallenge } from "../../utils/pkce";

export const LoginPage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const { loading, wrap } = useLoading();

  const handleGoogleLogin = async () => {
    // 1. Lấy Client ID từ biến môi trường (an toàn hơn)
    const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    console.log(googleClientId) 

    // redirectUri để trỏ về frontend
    const redirectUri = "https://visual-story-wwtf.fly.dev/google/callback";

    if (!googleClientId) {
      alert("Google Client ID is not set in environment variables.");
      return;
    }

    // 3. Tạo cặp khóa PKCE
    const { verifier, challenge } = await generatePkceChallenge();

    // 4. Lưu 'verifier' vào localStorage để dùng sau khi redirect về
    localStorage.setItem("pkce_verifier", verifier);

    // 5. Tạo một 'state' ngẫu nhiên để chống tấn công CSRF
    const state = Math.random().toString(36).substring(2, 15);
    localStorage.setItem("oauth_state", state);

    // 6. Xây dựng URL
    const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    authUrl.searchParams.append("client_id", googleClientId);
    authUrl.searchParams.append("redirect_uri", redirectUri);
    authUrl.searchParams.append("response_type", "code");
    authUrl.searchParams.append("scope", "openid email profile"); // Các quyền bạn muốn yêu cầu
    authUrl.searchParams.append("code_challenge", challenge);
    authUrl.searchParams.append("code_challenge_method", "S256");
    authUrl.searchParams.append("state", state);

    // 7. Chuyển hướng người dùng
    window.location.href = authUrl.toString();

  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md px-4 sm:px-6 mt-4 flex flex-col items-center">
        {error && (
          <div className="w-full text-center p-3 text-sm text-[var(--color2)] rounded-lg bg-[var(--button-bg-hover)] border-2 border-[var(--button-border)] mb-4">
            lỗi rồi hiu hiu 😭
          </div>
        )}
        <div className="flex flex-col items-center w-full gap-4 mt-6">
          <Button
            variant="primary"
            type="button"
            className="w-60 md:w-80 lg:w-100 text-lg  flex items-center justify-center bg-[var(--button-bg-google)] h-10 md:h-16 lg:h-20"
            loading={loading}
            onClick={() => handleGoogleLogin()}
          >
            <img
              src="logo-google.png"
              alt="flower icon"
              className=" h-20 md:h-40 lg:h-60 pointer-events-none select-none"
              draggable="false"
            />
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
};
