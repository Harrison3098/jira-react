/**
 * @Description	：use-async.ts
 * @Author     	: sagit_zhx
 * @Date       	: 2023-01-23 星期一 17:24:52
 * @FilePath	: jira/src/utils/use-async.ts
 */
import { useState } from "react";

const __defaultInitialState: State<null> = {
  status: "idle",
  data: null,
  error: null,
};

const __defaultConfig = {
  throwOnError: false,
};

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof __defaultConfig
) => {
  const config = {
    ...__defaultInitialState,
    ...initialConfig,
  };

  const [state, setState] = useState<State<D>>({
    ...__defaultInitialState,
    ...initialState,
  });

  const setData = (data: D) => {
    setState({
      data,
      status: "success",
      error: null,
    });

    return data;
  };

  const setFail = (error: Error | null) => {
    setState({
      data: null,
      status: "fail",
      error,
    });

    return config?.throwOnError ? Promise.reject(error) : error;
  };

  /**
   * 执行异步函数
   * @param {Promise<D>} p
   * @returns {Promise<D | Error | null>}
   */
  const run = (p: Promise<D>) => {
    if (!p || !p.then) throw new Error("请传入 Promise 类型数据");

    setState({ ...state, status: "loading" });

    return p.then(setData).catch(setFail);
  };

  return {
    isIdle: Object.is(state.status, "idle"),
    isLoading: Object.is(state.status, "loading"),
    isFail: Object.is(state.status, "fail"),
    isSuccess: Object.is(state.status, "success"),
    run,
    setData,
    setFail,
    ...state,
  };
};

type State<D> = {
  error?: Error | null;
  data?: D | null;
  status?: "idle" | "loading" | "fail" | "success";
};
