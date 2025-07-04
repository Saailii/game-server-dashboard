"use client";
import cookie from "cookiejs";
import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
  useContext,
} from "react";

export interface User {
  user: string;
  email: string;
  fullName: string;
  role: string;
  id: string;
}

type AuthContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  isLoading: boolean;
  RequireAuth: Function;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  isLoading: true,
  RequireAuth: () => {},
});

export function AuthProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const RequireAuth = () => {
    if (!user) {
      window.location.href = "/login";
    }
  };

  useEffect(() => {
    const token = cookie.get("token");
    if (!token) {
      setIsLoading(false);
      return;
    }
    const fetchUser = async () => {
      const response = await fetch("http://localhost:3333/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        setIsLoading(false);
        return console.warn("error with the response");
      }
      const data = await response.json();
      setUser(data.user);
      setIsLoading(false);
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        RequireAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
