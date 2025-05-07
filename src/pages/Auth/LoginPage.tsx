import React, { useState } from "react";
import { Input, Button } from "../../components";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/16/solid";
import { AuthLayout } from "../../layouts/AuthLayout";
import { useLoading } from "../../hooks/useLoading";

export const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { loading, wrap } = useLoading();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await wrap(login)(username, password);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Đăng nhập thất bại");
    }
  };

  return (
    <AuthLayout>
      <form
        onSubmit={handleSubmit}
        className="mt-4 flex flex-col items-center px-6"
      >
      {error && (
          <div className="flex items-center justify-center text-red-700 rounded-full bg-[var(--button-bg-hover)] border-2 border-[var(--button-border)] mb-4">
            {error} 
          </div>
        )}
        <div className="flex flex-col justify-center items-center">
          <Input
            placeholder="Tên đăng nhập"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-4 p-3 w-3/4"
            required
          />

          <Input
            placeholder="Mật khẩu"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 p-3 w-3/4"
            required
          />
        </div>

        <div className="flex flex-col items-center w-full gap-4 mt-6">
          <Button
            type="submit"
            loading={loading}
            variant="primary"
            className="w-full  text-lg  flex items-center justify-center"
          >
            <img src="leaf1.png" alt="flower icon" className="w-16 h-16 pointer-events-none" />
            <span className=" mr-4">vào khu vườn thôi</span>
          </Button>

          <Button
            variant="primary"
            type="button"
            className="w-full  text-lg  flex items-center justify-center"
            onClick={() => navigate("/register")}
          >
              <img src="leaf1.png" alt="flower icon" className="w-16 h-16 pointer-events-none" />
              <span className=" mr-4">tạo khu vườn mới</span>
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
};
