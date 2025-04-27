import React, { useState } from 'react';
import { Input, Button } from '../../components';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/16/solid';
import { AuthLayout } from '../../layouts/AuthLayout';
import { useLoading } from '../../hooks/useLoading';

export const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { register } = useAuth();
  const navigate = useNavigate();
  const {loading,wrap}=useLoading();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Mật khẩu không khớp!');
      return;
    }

    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự!');
      return;
    }

    try {
      await wrap(register)(username, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Đăng ký thất bại');
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
          className="mb-4 w-full p-3"
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
        <Input
          placeholder='Xác nhận mật khẩu'
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="mb-4 w-full p-3"
          required
        />
        <div className="flex justify-center gap-4 mt-4 mx-5">
          <Button variant='primary' type='button' className='flex items-center' onClick={() => navigate('/login')}>
            <ChevronLeftIcon className='w-4 h-4' />
            <span className='mr-1'>Đăng nhập</span>
          </Button>
          <Button type='submit' variant='primary' loading={loading}>
            <p className='px-10'>Đăng ký</p>
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
};