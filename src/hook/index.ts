/**
 * @Description	：index.ts
 * @Author     	: sagit_zhx
 * @Date       	: 2023-01-20 星期五 22:54:14
 * @FilePath	: jira/src/hook/index.ts
 */
import { useEffect } from "react";

export const useMount = (cb: Function) => {
  useEffect(() => {
    cb();
  }, []);
};
