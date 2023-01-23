/**
 * @Description	：login.tsx
 * @Author     	: sagit_zhx
 * @Date       	: 2023-01-20 星期五 02:21:00
 * @FilePath	: jira/src/unauthenticated-app/login.tsx
 */
import React from "react";
import { useAuth } from "context/auth-context";
import { Form, Input } from "antd";
import { LoginButton } from "./";
import { useAsync } from "hook";

export const LoginScreen = ({ onError }: { onError: (err: Error) => void }) => {
  const { login } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      await run(login(values));
    } catch (e) {
      onError(e as Error);
    }
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder={"用户名"} type="text" id={"username"} />
      </Form.Item>

      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder={"密码"} type="password" id={"password"} />
      </Form.Item>

      <LoginButton loading={isLoading} htmlType={"submit"} type={"primary"}>
        登录
      </LoginButton>
    </Form>
  );
};
