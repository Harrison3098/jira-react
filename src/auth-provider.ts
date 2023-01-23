/**
 * @Description	：auth-provider.ts
 * @Author     	: sagit_zhx
 * @Date       	: 2023-01-19 星期四 17:23:35
 * @FilePath	: jira/src/auth-provider.ts
 */
const localStorageKey = "__auth_provider_token";
const apiUrl = process.env.REACT_APP_API_URL || "";

export const getToken = () => globalThis.localStorage.getItem(localStorageKey);

export const handleUserResponse = ({ user }: { user: User }) => {
  globalThis.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

export const login = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (res) => {
    const data = await res.json();

    return res.ok ? handleUserResponse(data) : Promise.reject(data);
  });
};

export const register = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (res) => {
    const data = await res.json();

    return res.ok ? handleUserResponse(data) : Promise.reject(data);
  });
};

export const logout = async () =>
  globalThis.localStorage.removeItem(localStorageKey);

export type User = {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
};
