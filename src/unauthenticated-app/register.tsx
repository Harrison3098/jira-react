/**
 * @Description	：register.tsx
 * @Author     	: sagit_zhx
 * @Date       	: 2023-01-20 星期五 02:21:08
 * @FilePath	: jira/src/unauthenticated-app/register.tsx
 */
import React from "react";
import { useAuth } from "context/auth-context";
import { Form, Input } from "antd";
import { LoginButton } from "./";
import { useAsync } from "hook";

export const RegisterScreen = ({
  onError,
}: {
  onError: (err: Error) => void;
}) => {
  const { register } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  const handleSubmit = ({
    cpassword,
    ...values
  }: {
    username: string;
    password: string;
    cpassword: string;
  }) => {
    Object.is(cpassword, values.password)
      ? run(register(values)).catch(onError)
      : onError(new Error("两次输入的密码不一致"));
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

      <Form.Item
        name={"cpassword"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder={"再次确认密码"} type="password" id={"cpassword"} />
      </Form.Item>

      <LoginButton loading={isLoading} htmlType={"submit"} type={"primary"}>
        注册
      </LoginButton>
    </Form>
  );
};
