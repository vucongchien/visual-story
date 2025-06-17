import React, { useContext, useState, useEffect } from 'react'
import { User } from '../types';
import * as authApi from '../api/authApi';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    loginWithGoogleAccessToken: (accessToken: string) => Promise<void>; 
    logout: () => void;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading,setIsLoading]=useState<boolean>(true)

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        if (token && storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                localStorage.clear();
            }
        }
        setIsLoading(false)
    }, []);

    // Hàm login mới
    const loginWithGoogleAccessToken = async (accessToken: string) => {
        try {
            const response = await authApi.loginWithGoogleAccessToken(accessToken);
            const { token, user } = response;
            
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            
            setUser(user);
        } catch (error) {
            console.error("Google Login Failed:", error);
            throw error;
        }
    };

    // const login = async (username: string, password: string) => {
    //     try {
    //         const response = await authApi.login(username, password);
    //         const { token, user } = response;
            
    //         // Store token and user info
    //         localStorage.setItem('token', token);
    //         localStorage.setItem('user', JSON.stringify(user));
            
    //         setUser(user);
    //     } catch (error) {
    //         throw error;
    //     }
    // };

    // const register = async (username: string, password: string) => {
    //     try {
    //         await authApi.register(username, password);
    //         // After successful registration, automatically log in
    //         await login(username, password);
    //     } catch (error) {
    //         throw error;
    //     }
    // };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    const value: AuthContextType = {
        user,
        isAuthenticated: !!user,
        isLoading,
        loginWithGoogleAccessToken,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext