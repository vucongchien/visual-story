import React, { useState } from 'react';
import { Input, Button } from '../../components';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/16/solid';
import { AuthLayout } from '../../layouts/AuthLayout';

export const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await login(username, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Đăng nhập thất bại');
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} className='mt-[20px]'>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        <Input
          placeholder='Tên đăng nhập'
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-4 w-full p-3 min-w-[400px]"
          required
        />
        <Input
          placeholder='Mật khẩu'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 w-full p-3"
          required
        />
        <div className="flex justify-center gap-4 mt-4 mx-5">
          <Button type="submit" variant="primary">
            <p className='px-10'>Đăng nhập</p>
          </Button>
          <Button variant="primary" type='button' className="flex items-center" onClick={() => navigate('/register')}>
            <span className="mr-1">Đăng ký</span>
            <ChevronRightIcon className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
}; 