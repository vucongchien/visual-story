import React, { useContext, useState, useEffect, useCallback } from "react";
import { User } from "../types";
import * as authApi from "../api/authApi";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  checkAuthStatus: () => Promise<void>;
  logout: () => Promise<void>;
  login: (user: User) => void;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

const checkAuthStatus = useCallback(async () => {
    try {
      const userData = await authApi.getMe();
      setUser(userData);
    } catch (error) {
      setUser(null);
      console.log("Failed to authenticate session.", error);
    }
  }, []);

   useEffect(() => {
const initialize = async () => {
  try {
    await checkAuthStatus();
  } catch (e) {
  } finally {
    setIsLoading(false);
  }
};
    initialize();
  }, [checkAuthStatus]);

  const logout = async () => {
    try {
      await authApi.logoutUser();
    } catch (error) {
      console.error("Lỗi khi gọi API logout, nhưng vẫn tiếp tục ở client.", error);
    } finally {
      setUser(null);
    }
  };
  const login = (loggedInUser: User) => {
    setUser(loggedInUser);
  };


  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    checkAuthStatus,
    logout,
    login,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
