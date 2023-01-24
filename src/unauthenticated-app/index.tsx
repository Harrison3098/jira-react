/**
 * @Description	：index.tsx
 * @Author     	: sagit_zhx
 * @Date       	: 2023-01-20 星期五 02:20:54
 * @FilePath	: jira/src/unauthenticated-app/index.tsx
 */
import { useState } from "react";
import { RegisterScreen } from "unauthenticated-app/register";
import { LoginScreen } from "unauthenticated-app/login";
import { Button, Card, Divider, Typography } from "antd";
import styled from "@emotion/styled";
import logo from "logo.svg";
import { useDocumentTitle } from "hook";

export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useDocumentTitle("请登录", false);

  return (
    <Container>
      <Header></Header>

      <ShadowCard>
        <Title>请{!isRegister ? "登录" : "注册"}</Title>

        {error && (
          <Typography.Text type={"danger"}>{error.message}</Typography.Text>
        )}

        {isRegister ? (
          <RegisterScreen onError={setError} />
        ) : (
          <LoginScreen onError={setError} />
        )}

        <Divider />

        <Button
          type={"link"}
          onClick={() => {
            setError(null);
            setIsRegister(!isRegister);
          }}
        >
          {isRegister ? "已有账号？直接登陆" : "没有账号？前往注册"}
        </Button>
      </ShadowCard>
    </Container>
  );
};

const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-shadow: rgb(0, 0, 0, 0.1) 0 0 10px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  text-align: center;
`;

const Header = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`;

const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(93, 108, 132);
`;

export const LoginButton = styled(Button)`
  width: 100%;
`;

// const Background = styled.div`
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   background-repeat: no-repeat;
//   background-attachment: fixed;
//   background-position: left bottom, right bottom;
//   background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
//     calc(((100vw - 40rem) / 2) - 3.2rem), cover;
// `;
