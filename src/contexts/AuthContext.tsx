import React, { useContext, useState } from 'react'
import { User,UserProfile } from '../types';
interface AuthContextType {

    user: User | null;
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<void>;
    register: (username: string, password: string,sex:string,old:number,) => Promise<void>;
    logout: () => void;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const useAuth  =()=>{
    const context=useContext(AuthContext)
    if(!context){
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = async (username: string, password: string) => {
        // Simulate user authentication and fetching user data
        const userData: User = { id: '1', username }; // Replace with actual authentication logic
        setUser(userData);
    };

    const register = async (username: string, password:string,sex:string,old:number) => {
        // Simulate user registration and fetching user data
        const userData: User = { id: '1', username }; // 
        // Replace with actual registration logic
        // You can also set additional user profile data here if needed
        const userProfile: UserProfile = { id: '1', username,sex,old }; // Replace with actual user profile data
        setUser(userData);
    }
    

    const logout = () => {
        setUser(null);
    };

    const value: AuthContextType = {
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};


export default AuthContext