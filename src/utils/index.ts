/**
 * @Description	：index.ts
 * @Author     	: sagit_zhx
 * @Date       	: 2023-01-21 星期六 22:00:32
 * @FilePath	: jira/src/utils/index.ts
 */
export { http, useHttp } from "./http";
/**
 * 清除对象里的空值（0除外）
 * @param {T} obj
 * @returns {Partial<T>}
 */
export const cleanObject = <T>(obj?: T): Partial<T> => {
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

export const resetRoute = () => {
  globalThis.location.href = globalThis.location.origin;
};
