/**
 * @Description	：use-projects.ts
 * @Author     	: sagit_zhx
 * @Date       	: 2023-01-23 星期一 17:53:46
 * @FilePath	: jira/src/utils/use-projects.ts
 */
import { useEffect } from "react";
import { useHttp } from "utils";
import { Project } from "screens/project-list/list";
import { useAsync } from "hook";

export const useProjects = (param: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();

  useEffect(() => {
    run(client("projects", { data: param }));
  }, [param]);

  return result;
};

export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      })
    );
  };
  return { mutate, ...asyncResult };
};

export const useAddProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "POST",
      })
    );
  };
  return { mutate };
};
