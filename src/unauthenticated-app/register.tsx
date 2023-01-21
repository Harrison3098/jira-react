/**
 * @Description	：register.tsx
 * @Author     	: sagit_zhx
 * @Date       	: 2023-01-20 星期五 02:21:08
 * @FilePath	: jira/src/unauthenticated-app/register.tsx
 */
import React, { FormEvent } from "react";
import { useAuth } from "context/auth-context";
import { Button, Form, Input } from "antd";

export const RegisterScreen = () => {
  const { register, user } = useAuth();

  const handleSubmit = (values: { username: string; password: string }) => {
    register(values);
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

      <Button htmlType={"submit"} type={"primary"}>
        注册
      </Button>
    </Form>
  );
};
