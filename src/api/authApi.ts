const BASE_URL = import.meta.env.VITE_API_URL;


interface LoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
  };
}

interface RegisterResponse {
  message: string;
}

export async function login(username: string, password: string): Promise<LoginResponse> {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Đăng nhập thất bại');
  }
  return res.json();
}

export async function register(username: string, password: string): Promise<RegisterResponse> {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Đăng ký thất bại');
  }
  return res.json();
}
