/**
 * @Description	：useDocumentTitle.ts
 * @Author     	: sagit_zhx
 * @Date       	: 2023-01-24 星期二 22:06:16
 * @FilePath	: jira/src/hook/useDocumentTitle.ts
 */
import { useEffect, useRef } from "react";

export const useDocumentTitle = (title: string, keepOnUnmount = true) => {
  const { current: oldTitle } = useRef(document.title);

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    if (!keepOnUnmount)
      return () => {
        document.title = oldTitle;
      };
  }, [keepOnUnmount, oldTitle]);
};
