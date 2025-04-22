import React, { useState } from 'react';
import { Input,Button} from '../../components';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {ChevronLeftIcon} from '@heroicons/react/16/solid'
import { AuthLayout } from '../../layouts/AuthLayout';

export const RegisterPage: React.FC = () => {

      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');
        const [confirmPassword, setConfirmPassword] = useState('');
      const [sex, setSex] = useState('');
      const [old, setOld] = useState('');
      const { login } = useAuth();
      const navigate = useNavigate();

      const handleSubmit=(e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
       login(username, password)
          .then(() => {
            navigate('/dashboard');
          })
          .catch((error) => {
            console.error('Login failed:', error);
          });
      }

    return(
        <AuthLayout>
            <form onSubmit={handleSubmit} className='mt-[20px]'>
                <Input
                placeholder='Username'
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mb-4 w-full p-3"
                />
                <Input
                placeholder='Password'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mb-4 w-full p-3"
                />
                <Input
                placeholder='Confirm Password'
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mb-4 w-full p-3"
                />
                <Input
                placeholder='Sex'
                type="text"
                value={sex}
                onChange={(e) => setSex(e.target.value)}
                className="mb-4 w-full p-3"
                />
                <Input
                placeholder='Old'
                type="number"
                value={old}
                onChange={(e) => setOld(e.target.value)}
                className="mb-4 w-full p-3"
                />
                <div className="flex justify-center gap-4 mt-4 mx-5">
                    <Button variant='primary'  type='button' className='flex items-center' onClick={() => navigate('/login')}>
                        <ChevronLeftIcon className='w-4 h-4 '/>
                        <span className='mr-1'> Login</span>
                    </Button>
                    <Button type='submit' variant='primary'>
                        <p className='px-10'>Register</p>
                    </Button>
                </div>

            </form>
        </AuthLayout>
    )

}