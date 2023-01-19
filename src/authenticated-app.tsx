/**
 * @Description	：authenticated-app.tsx
 * @Author     	: sagit_zhx
 * @Date       	: 2023-01-20 星期五 02:20:15
 * @FilePath	: jira/src/authenticated-app.tsx
 */
import { useAuth } from "context/auth-context";
export const AuthenticatedApp = () => {
  const { logout } = useAuth();

  return (
    <div>
      已登录
      <button onClick={logout}>登出</button>
    </div>
  );
};
