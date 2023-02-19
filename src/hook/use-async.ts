/**
 * @Description	：use-async.ts
 * @Author     	: sagit_zhx
 * @Date       	: 2023-01-23 星期一 17:24:52
 * @FilePath	: jira/src/utils/use-async.ts
 */
import { useCallback, useReducer } from "react";
import { useMountedRef } from "./";

const __defaultInitialState: State<null> = {
  status: "idle",
  data: null,
  error: null,
};

const __defaultConfig = {
  throwOnError: false,
};

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef();

  return useCallback(
    (...args: T[]) => {
      return mountedRef.current ? dispatch(...args) : void 0;
    },
    [dispatch, mountedRef]
  );
};

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof __defaultConfig
) => {
  const config = {
    ...__defaultInitialState,
    ...initialConfig,
  };

  /**
   * 原：useState
   */
  // const [state, setState] = useState<State<D>>({
  //   ...__defaultInitialState,
  //   ...initialState,
  // });

  /**
   * 升级：useReducer
   */
  const [state, dispatch] = useReducer(
    (state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }),
    {
      ...__defaultInitialState,
      ...initialState,
    }
  );

  /**
   * 安全 - 阻止在已卸载组件上赋值
   * @type {React.MutableRefObject<boolean>}
   */
  // const mountedRef = useMountedRef();
  // const setStateOnMounted = useCallback(
  //   (data: State<D>) => {
  //     if (!mountedRef.current) return;
  //
  //     setState(data);
  //   },
  //   [mountedRef]
  // );
  const setStateOnMounted = useSafeDispatch(dispatch);

  const setData = useCallback(
    (data: D) => {
      setStateOnMounted({
        data,
        status: "success",
        error: null,
      });

      return data;
    },
    [setStateOnMounted]
  );

  const setFail = useCallback(
    (error: Error | null) => {
      setStateOnMounted({
        data: null,
        status: "fail",
        error,
      });

      return config?.throwOnError ? Promise.reject(error) : error;
    },
    [config?.throwOnError, setStateOnMounted]
  );

  /**
   * 执行异步函数
   * @param {Promise<D>} p
   * @returns {Promise<D | Error | null>}
   */
  const run = useCallback(
    (p: Promise<D>) => {
      if (!p || !p.then) throw new Error("请传入 Promise 类型数据");

      setStateOnMounted({ status: "loading" });

      return p.then(setData).catch(setFail);
    },
    [setData, setFail, setStateOnMounted]
  );

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
