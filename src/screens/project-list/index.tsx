/**
 * @Description	：index.tsx
 * @Author     	: sagit_zhx
 * @Date       	: 2023-01-21 星期六 20:50:01
 * @FilePath	: jira/src/screens/project-list/index.tsx
 */
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useDebounce, useProjects, useUrlQueryParam, useUsers } from "hook";
import styled from "@emotion/styled";
import { Button, Typography } from "antd";
import { Row } from "components";
import { useDispatch } from "react-redux";
import { projectListActions } from "./project-list.slice";

export const ProjectList = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  const dispatch = useDispatch();

  const {
    isLoading,
    error,
    data: list,
    setData: updateList,
  } = useProjects(useDebounce(param, 500));
  const { data: users } = useUsers();

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>

        <Button onClick={() => dispatch(projectListActions.openProjectModal())}>
          创建项目
        </Button>
      </Row>

      <SearchPanel
        users={users || []}
        param={param}
        setParam={setParam}
      ></SearchPanel>

      {error && (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      )}

      <List
        loading={isLoading}
        dataSource={list || []}
        users={users || []}
        updateList={updateList}
      ></List>
    </Container>
  );
};

// ProjectList.whyDidYouRender = true;

const Container = styled.div`
  padding: 0 3.2rem;
`;
