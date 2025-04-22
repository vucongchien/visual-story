import React, { useState } from 'react';
import { Input,Button} from '../../components';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {ChevronRightIcon} from '@heroicons/react/16/solid'
import { AuthLayout } from '../../layouts/AuthLayout';

export const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    console.log('LoginPage')
    e.preventDefault();
    login(username, password)
      .then(() => {
        navigate('/dashboard');
      })
      .catch((error) => {
        console.error('Login failed:', error);
      });

  };

  return (
    <AuthLayout >
        <form onSubmit={handleSubmit} className='mt-[20px]'>
          <Input
            placeholder='User name'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-4 w-full p-3 min-w-[400px]"
          />
          <Input
            placeholder='Password'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 w-full p-3"
          />
          <div className="flex justify-center gap-4 mt-4 mx-5">
            <Button type="submit" variant="primary">
              <p className='px-10'>Login</p>
            </Button>
            <Button variant="primary" type='button' className="flex items-center" onClick={() => navigate('/register')}>
              <span className="mr-1">Sign up</span>
              <ChevronRightIcon className="w-4 h-4" />
            </Button>
          </div>
        </form>

    </AuthLayout>
  );
}; 