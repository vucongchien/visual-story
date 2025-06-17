import React, { useState } from "react";
import { Button } from "../../components";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { AuthLayout } from "../../layouts/AuthLayout";
import { useLoading } from "../../hooks/useLoading";
import { useGoogleLogin } from "@react-oauth/google";

export const LoginPage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const { loading, wrap } = useLoading();
  const { loginWithGoogleAccessToken } = useAuth();
  const navigate = useNavigate();

  const handleLogin = useGoogleLogin({
    scope:[
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile'
      //'https://www.googleapis.com/auth/user.birthday.read',
      //'https://www.googleapis.com/auth/user.gender.read',
    ].join(" "),

    onSuccess: async (tokenResponse) => {
     setError(null);
     try{
      await wrap(loginWithGoogleAccessToken)(tokenResponse.access_token);
      navigate("/dashboard");

     }catch (err: any) {
      setError(err.message || "Đăng nhập bằng Google thất bại");
     }
    },
    onError:(errorResponse) => {
      console.error('Google login error:', errorResponse);
      setError(errorResponse.error || "Đăng nhập bằng Google thất bại");
    }

  })

  return (
    <AuthLayout>
      <div className="w-full max-w-md px-4 sm:px-6 mt-4 flex flex-col items-center">
        
      {error && (
          <div className="w-full text-center p-3 text-sm text-red-700 rounded-lg bg-[var(--button-bg-hover)] border-2 border-[var(--button-border)] mb-4">
            {error}
          </div>
        )}
        <div className="flex flex-col items-center w-full gap-4 mt-6">
          <Button
            variant="primary"
            type="button"
            className="w-60 md:w-80 lg:w-100 text-lg  flex items-center justify-center bg-[var(--button-bg-google)] h-10 md:h-16 lg:h-20"
            loading={loading}
            onClick={() => handleLogin()}
          >
              <img src="logo-google.png" alt="flower icon" className=" h-20 md:h-40 lg:h-60 pointer-events-none select-none" 
              draggable="false" />
          </Button>

        </div>
      </div>
    </AuthLayout>
  );
};
