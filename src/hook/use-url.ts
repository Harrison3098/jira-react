import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { cleanObject } from "utils";

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
      keys.reduce((prev, key: string) => {
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
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);

  return {
    projectModalVisible: Object.is(projectCreate, "true"),
    open: () => setProjectCreate({ projectCreate: true }),
    close: () => setProjectCreate({ projectCreate: undefined }),
  };
  // return [projectCreate === "true", open, close] as const;
};
