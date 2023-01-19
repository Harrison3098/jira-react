/**
 * @Description	：auth-context.tsx
 * @Author     	: sagit_zhx
 * @Date       	: 2023-01-19 星期四 17:35:33
 * @FilePath	: jira/src/context/auth-context.tsx
 */
import React, { ReactNode, useState } from "react";
import * as auth from "auth-provider";
import { User } from "auth-provider";

type AuthForm = {
  username: string;
  password: string;
};

const AuthContext = React.createContext<
  | {
      user: User | null;
      login: (form: AuthForm) => Promise<void>;
      register: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) throw new Error("useAuth必须在AuthProvide中使用");
  return context;
};
