import React, { createContext, useContext, useState } from "react";

interface AuthContextType {
    accessToken: string | undefined;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children } : { children: React.ReactNode })
{
    const [accessToken, setAccessToken] = useState<string | undefined>(undefined);

    const login = (token: string) => {
        setAccessToken(token);
    }

    const logout = () => {
        setAccessToken(undefined);
    }

    return (
        <AuthContext.Provider value={{ accessToken, login, logout }}>
            {children}
        </AuthContext.Provider>        
    );
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;

