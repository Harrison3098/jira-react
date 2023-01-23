/**
 * @Description	：index.ts
 * @Author     	: sagit_zhx
 * @Date       	: 2023-01-21 星期六 22:00:32
 * @FilePath	: jira/src/utils/index.ts
 */
export { useMount, useDebounce } from "./hook";
export { http, useHttp } from "./http";

/**
 * 清除对象里的空值（0除外）
 * @param {T} obj
 * @returns {T}
 */
export const cleanObject = <T extends { [key: string]: K }, K = unknown>(
  obj?: T
) => {
  if (!obj) return {};

  return Object.entries(obj).reduce((tempObj, [key, value]) => {
    return {
      ...tempObj,
      ...(!Object.is(value ?? "", "") && {
        [key]: value,
      }),
    };
  }, {} as T);
};
