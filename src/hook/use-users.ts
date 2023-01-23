/**
 * @Description	：use-users.ts
 * @Author     	: sagit_zhx
 * @Date       	: 2023-01-23 星期一 18:56:03
 * @FilePath	: jira/src/hook/use-users.ts
 */
import { User } from "screens/project-list/search-panel";
import { useHttp } from "utils";
import { useAsync, useMount } from "./";

export const useUsers = () => {
  const client = useHttp();
  const { run, ...result } = useAsync<User[]>();

  useMount(() => run(client("users")));

  return result;
};
