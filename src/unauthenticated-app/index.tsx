/**
 * @Description	：index.tsx
 * @Author     	: sagit_zhx
 * @Date       	: 2023-01-20 星期五 02:20:54
 * @FilePath	: jira/src/unauthenticated-app/index.tsx
 */
import { useState } from "react";
import { RegisterScreen } from "unauthenticated-app/register";
import { LoginScreen } from "unauthenticated-app/login";
import { Button, Card } from "antd";

export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <Card>
        {isRegister ? <RegisterScreen /> : <LoginScreen />}
        <Button onClick={() => setIsRegister(!isRegister)}>
          切换到{isRegister ? "登录" : "注册"}
        </Button>
      </Card>
    </div>
  );
};
