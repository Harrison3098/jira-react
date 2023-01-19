/**
 * @Description	：register.tsx
 * @Author     	: sagit_zhx
 * @Date       	: 2023-01-20 星期五 02:21:08
 * @FilePath	: jira/src/unauthenticated-app/register.tsx
 */
import React, { FormEvent } from "react";
import { useAuth } from "context/auth-context";

export const RegisterScreen = () => {
  const { register, user } = useAuth();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const [username, password] = Array.from(event.currentTarget.elements).map(
      (i) => (i as HTMLInputElement).value
    );

    register({ username, password });
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

      <button type="submit">注册</button>
    </form>
  );
};
