/**
 * @Description	：use-projects.ts
 * @Author     	: sagit_zhx
 * @Date       	: 2023-01-23 星期一 17:53:46
 * @FilePath	: jira/src/utils/use-projects.ts
 */
import { useHttp } from "utils";
import { Project } from "screens/project-list/list";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();

  /**
   * useQuery
   */
  return useQuery<Project[], Error>(["projects", param], () =>
    client("projects", { data: param })
  );

  /**
   * useAsync
   */
  // const { run, ...result } = useAsync<Project[]>();
  //
  // useEffect(() => {
  //   run(client("projects", { data: param }));
  // }, [param, run, client]);
  //
  // return result;
};

export const useEditProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();

  /**
   * useMutation
   */
  return useMutation(
    (params: Partial<Project>) => {
      return client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      });
    },
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
  /**
   * useAsync
   */
  // const { run, ...asyncResult } = useAsync();
  // const mutate = (params: Partial<Project>) => {
  //   return run(
  //     client(`projects/${params.id}`, {
  //       data: params,
  //       method: "PATCH",
  //     })
  //   );
  // };
  // return { mutate, ...asyncResult };
};

export const useAddProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();

  /**
   * useMutation
   */
  return useMutation(
    (params: Partial<Project>) => {
      return client(`projects`, {
        data: params,
        method: "POST",
      });
    },
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
  /**
   * useAsync
   */
  // const { run, ...asyncResult } = useAsync();
  // const mutate = (params: Partial<Project>) => {
  //   return run(
  //     client(`projects/${params.id}`, {
  //       data: params,
  //       method: "POST",
  //     })
  //   );
  // };
  // return { mutate, ...asyncResult };
};

export const useProject = (id?: number) => {
  const client = useHttp();

  return useQuery<Project>(
    ["project", { id }],
    () => client(`projects/${id}`),
    {
      enabled: !!id,
    }
  );
};
