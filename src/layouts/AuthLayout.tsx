import React from 'react'
import { Card } from '../components';

type AuthLayoutProps = {
    children: React.ReactNode;
}

export const AuthLayout:React.FC<AuthLayoutProps> = ({children}) => {
  return (
    <div className='flex items-center justify-center min-h-screen'>
        <Card className='max-w-md w-[800px] mx-auto p-6'>
            {children}
        </Card>

    </div>
  )
}
