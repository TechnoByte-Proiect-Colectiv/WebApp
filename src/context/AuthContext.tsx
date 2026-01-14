import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { userService } from "../services/userService";
import { User, LoginCredentials } from "../types/user/user";

interface AuthContextType {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (newToken: string) => void;
  loginWithCredentials: (creds: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>({
  token: null,
  user: null,
  login: () => {},
  loginWithCredentials: async () => {},
  logout: async () => {},
  isAuthenticated: false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(userService.getToken());

  useEffect(() => {
    const storedToken = userService.getToken();
    if (storedToken) {
      setToken(storedToken);
    }

    const storedUser = userService.getCurrentUser();
    if (storedUser) {
      setUser(storedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("authToken", newToken);
    const storedUser = userService.getCurrentUser();
    if (storedUser) {
      setUser(storedUser);
      setIsAuthenticated(true);
    }
  };

  const loginWithCredentials = async (creds: LoginCredentials) => {
    const { token: t, user: u } = await userService.login(creds);
    setToken(t);
    setUser(u);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await userService.logout();
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  const contextValue = useMemo(
    () => ({
      token,
      user,
      login,
      loginWithCredentials,
      logout,
      isAuthenticated,
    }),
    [token, user, isAuthenticated]
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
    throw new Error("useAuth should be used inside an AuthProvider");
  }
  return context;
};
