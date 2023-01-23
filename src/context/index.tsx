/**
 * @Description	：index.ts
 * @Author     	: sagit_zhx
 * @Date       	: 2023-01-19 星期四 17:35:16
 * @FilePath	: jira/src/context/index.ts
 */
import React, { ReactNode } from "react";
import { AuthProvider } from "./auth-context";
import { QueryClient, QueryClientProvider } from "react-query";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <AuthProvider>{children}</AuthProvider>;
    </QueryClientProvider>
  );
};
