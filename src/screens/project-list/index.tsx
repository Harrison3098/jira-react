/**
 * @Description	：index.tsx
 * @Author     	: sagit_zhx
 * @Date       	: 2023-01-21 星期六 20:50:01
 * @FilePath	: jira/src/screens/project-list/index.tsx
 */
import { SearchPanel, User } from "./search-panel";
import { List } from "./list";
import { useEffect, useState } from "react";
import { http, useDebounce, useHttp, useMount } from "utils";
import styled from "@emotion/styled";

export const ProjectList = () => {
  const client = useHttp();

  const [users, setUsers] = useState<User[]>([{ id: "", name: "全部" }]);
  const [list, setList] = useState([]);
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debounceParam = useDebounce(param, 500);

  useEffect(() => {
    client("projects", { data: debounceParam }).then(setList);
  }, [debounceParam]);

  useMount(() => {
    client("users").then((res) => setUsers(users.concat(res)));
  });

  return (
    <Container>
      <h1>项目列表</h1>

      <SearchPanel
        users={users}
        param={param}
        setParam={setParam}
      ></SearchPanel>

      <List list={list} users={users}></List>
    </Container>
  );
};

const Container = styled.div`
  padding: 0 3.2rem;
`;
