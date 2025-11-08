import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  //   token: string | null;
  isAuthenticated: boolean;
  login: (callback: () => void) => void;
  logout: (callback: () => void) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>({
  // token: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  //   const [token, setToken] = useState<string | null>(localStorage.getItem("authToken"));

  //   useEffect(() => {
  //     const storedToken = localStorage.getItem("authToken");
  //     if (storedToken) {
  //       setToken(storedToken);
  //     }
  //   }, []);

  const navigate = useNavigate();

  const login = (callback: () => void) => {
    // setToken(newToken);
    // localStorage.setItem("authToken", newToken);

    // TODO - modify with real auth
    setIsAuthenticated(true);
    console.log("User logged in");
    callback();
  };

  const logout = (callback: () => void) => {
    // setToken(null);
    // localStorage.removeItem("authToken");

    // TODO - modify with real logout
    setIsAuthenticated(false);
    console.log("User delogat");
    callback();
  };

  const contextValue = useMemo(
    () => ({
    //   token,
      login,
      logout,
      isAuthenticated
    //   isAuthenticated: !!token,
    }),
    [isAuthenticated]
    // [token]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
      throw new Error('useAuth should be used inside an AuthProvider');
    }
    return context;
  }
