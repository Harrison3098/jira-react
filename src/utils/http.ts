/**
 * @Description	：index.ts
 * @Author     	: sagit_zhx
 * @Date       	: 2023-01-20 星期五 02:43:23
 * @FilePath	: jira/src/utils/http.ts
 */

import qs from "qs";
import * as auth from "auth-provider";
import { useAuth } from "context/auth-context";
import { cleanObject } from "./";

const apiUrl = process.env.REACT_APP_API_URL || "";

export const http = async (
  url: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = Object.assign(
    {
      method: "GET",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": data ? "application/json" : "",
      },
    },
    customConfig
  );

  Object.is(config.method.toLocaleUpperCase(), "GET")
    ? (url += `?${qs.stringify(cleanObject(data))}`)
    : Object.assign(config, { body: JSON.stringify(cleanObject(data) || {}) });

  try {
    const res = await globalThis.fetch(`${apiUrl}/${url}`, config);

    if (res.status === 401) {
      await auth.logout();
      globalThis.setTimeout(() => globalThis.location.reload(), 3000);
      return Promise.reject({ message: "请重新登录" });
    }

    const data = res.json();
    return res.ok ? data : Promise.reject(data);
  } catch (e) {
    return Promise.reject(e);
  }
};

export const useHttp = () => {
  const { user } = useAuth();

  return (...[url, config]: Parameters<typeof http>) =>
    http(url, { ...config, token: user?.token });
};

type Config = RequestInit & {
  token?: string;
  data?: object;
};
