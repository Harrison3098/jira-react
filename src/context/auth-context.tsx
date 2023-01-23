/**
 * @Description	：auth-context.tsx
 * @Author     	: sagit_zhx
 * @Date       	: 2023-01-19 星期四 17:35:33
 * @FilePath	: jira/src/context/auth-context.tsx
 */
import React, { ReactNode } from "react";
import * as auth from "auth-provider";
import { User } from "auth-provider";
import { http } from "utils";
import { useAsync, useMount } from "hook";
import { FullPageErrorFallBack, FullPageLoading } from "components";

type AuthForm = {
  username: string;
  password: string;
};

const AuthContext = React.createContext<
  | {
      user?: User | null;
      login: (form: AuthForm) => Promise<User | null>;
      register: (form: AuthForm) => Promise<User | null>;
      logout: () => Promise<User | null>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";

const initUser = async () => {
  const token = auth.getToken();
  if (!token) return null;

  const { user } = await http("me", { token });
  return user;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // const [user, setUser] = useState<User | null>(null);
  const {
    data: user,
    setData: setUser,
    isFail,
    isIdle,
    isSuccess,
    isLoading,
    error,
    run,
  } = useAsync<User | null>();

  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));

  useMount(() => run(initUser()));

  if (isFail) return FullPageErrorFallBack(error);

  if (isLoading || isIdle) return FullPageLoading();

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
