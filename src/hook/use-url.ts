import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { cleanObject } from "utils";
import { useProject } from "./use-projects";

/**
 * 返回页面url中，指定键的参数值
 * @param {K[]} keys 想要获取的键值
 * @returns {readonly [K[], ((nextInit?: (URLSearchParamsInit | ((prev: URLSearchParams) => URLSearchParamsInit)), navigateOpts?: NavigateOptions) => void), (<K>(value: ((<K>(prevState: K[]) => K[]) | K[])) => void)]}
 */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [useKeys, setUseKeys] = useState(keys);
  const [searchParams, setSearchParam] = useSearchParams();

  const params = useMemo(
    () =>
      useKeys.reduce((prev, key: string) => {
        return {
          ...prev,
          [key]: searchParams.get(key) ?? "",
        };
      }, {} as { [key in K]: string }),
    [searchParams, useKeys]
  );

  const setParams = (params: Partial<{ [key in K]: unknown }>) => {
    const o = cleanObject<URLSearchParamsInit>({
      ...Object.fromEntries(searchParams),
      ...params,
    }) as URLSearchParamsInit;

    return setSearchParam(o);
  };

  return [params, setParams, setUseKeys] as const;
};

export const useProjectModal = () => {
  const [{ projectCreate, editingProjectId }, setProjectModal] =
    useUrlQueryParam(["projectCreate", "editingProjectId"]);

  const { data: editingProject, isLoading } = useProject(+editingProjectId);

  const open = () =>
    setProjectModal({ projectCreate: true, editingProjectId: undefined });
  const close = () => {
    setProjectModal({ projectCreate: undefined, editingProjectId: undefined });
  };
  const startEdit = (id: number) =>
    setProjectModal({ projectCreate: undefined, editingProjectId: id });

  return {
    projectModalVisible: Object.is(projectCreate, "true") || !!editingProjectId,
    title: Object.is(projectCreate, "true")
      ? "创建项目"
      : editingProjectId
      ? "编辑项目"
      : "未知",
    open,
    close,
    startEdit,
    editingProject,
    isLoading,
  };
  // return [projectCreate === "true", open, close] as const;
};
