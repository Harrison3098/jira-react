/**
 * @Description	：login.tsx
 * @Author     	: sagit_zhx
 * @Date       	: 2023-01-20 星期五 02:21:00
 * @FilePath	: jira/src/unauthenticated-app/login.tsx
 */
import React, { FormEvent } from "react";
import { useAuth } from "context/auth-context";

export const LoginScreen = () => {
  const { login, user } = useAuth();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const [username, password] = Array.from(event.currentTarget.elements).map(
      (i) => (i as HTMLInputElement).value
    );

    login({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id={"username"} />
      </div>

      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id={"password"} />
      </div>

      <button type="submit">登录</button>
    </form>
  );
};
