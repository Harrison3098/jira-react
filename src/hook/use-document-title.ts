/**
 * @Description	：useDocumentTitle.ts
 * @Author     	: sagit_zhx
 * @Date       	: 2023-01-24 星期二 22:06:16
 * @FilePath	: jira/src/hook/useDocumentTitle.ts
 */
import { useEffect, useRef } from "react";

/**
 * 进入不同页面时，切换标题
 * @param {string} title 标题内容
 * @param {boolean} keepOnUnmount 退出此页面时是否恢复原来的标题
 */
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
