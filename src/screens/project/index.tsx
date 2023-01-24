/**
 * @Description	：index.tsx
 * @Author     	: sagit_zhx
 * @Date       	: 2023-01-24 星期二 22:51:56
 * @FilePath	: jira/src/screens/project/index.tsx
 */
import { Link } from "react-router-dom";
import { BoardScreen } from "screens/board";
import { EpicScreen } from "screens/epic";
import { Navigate, Route, Routes } from "react-router";

export const ProjectScreen = () => {
  const linkItems = [
    { to: "/", label: "看板", element: <Navigate to={"board"}></Navigate> },
    { to: "board", label: "看板", element: <BoardScreen></BoardScreen> },
    { to: "epic", label: "任务组", element: <EpicScreen></EpicScreen> },
  ];

  return (
    <div>
      <h1>项目管理系统</h1>

      {linkItems.slice(1).map((i) => (
        <Link key={i.to} to={i.to}>
          {i.label}
        </Link>
      ))}

      <Routes>
        {linkItems.map((i) => (
          <Route key={i.to} path={i.to} element={i.element}></Route>
        ))}{" "}
      </Routes>
    </div>
  );
};
