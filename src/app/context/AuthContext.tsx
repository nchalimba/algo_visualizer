import React, { createContext, useContext, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  jwt: string | null;
  setJwt: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [jwt, setJwtState] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setJwt = (token: string | null) => {
    setJwtState(token);
    setIsAuthenticated(!!token);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, jwt, setJwt }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
