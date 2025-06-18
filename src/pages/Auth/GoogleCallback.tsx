import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { handleGoogleCallback } from "../../api/authApi";
import { useAuth } from "../../contexts/AuthContext";

const GoogleCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const processCallback = async () => {
      const params = new URLSearchParams(location.search);
      const code = params.get("code");
      
      const codeVerifier = localStorage.getItem("pkce_verifier");
      
      localStorage.removeItem("pkce_verifier");

      if (!code || !codeVerifier) {
        navigate("/login?error=authentication_failed");
        return;
      }

      try {
        const user = await handleGoogleCallback(code, codeVerifier);

        login(user); 

        
        navigate("/dashboard");

      } catch (error) {
        console.error("Lỗi khi xử lý callback từ Google:", error);
        const errorMessage = error instanceof Error ? error.message : "unknown_error";
        // navigate(`/login?error=${encodeURIComponent(errorMessage)}`);
      }
    };

    processCallback();
  }, [location, navigate]);

  return <div>Đăng nhập thành công! Đang chuyển hướng...</div>;
};

export default GoogleCallback;