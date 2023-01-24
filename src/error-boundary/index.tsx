/**
 * @Description	：错误边界页面
 * @Author     	: sagit_zhx
 * @Date       	: 2023-01-24 星期二 21:26:43
 * @FilePath	: jira/src/error-boundary/index.tsx
 */
import React from "react";

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallbackRender: FallbackRender }>,
  { error: Error | null }
> {
  state = {
    error: null,
  };

  /**
   * 当子组件抛出异常将会被调用赋值给 state
   * @param {Error} err
   * @returns {{err: Error}}
   */
  static getDerivedStateFromError(err: Error) {
    return { err };
  }

  render() {
    const { error } = this.state;
    const { fallbackRender, children } = this.props;

    /**
     * 有错误 => 渲染错误页
     * 无错误 => 渲染子页面
     */
    return error ? fallbackRender(error) : children;
  }
}

type FallbackRender = (props: { error?: Error | null }) => React.ReactElement;
