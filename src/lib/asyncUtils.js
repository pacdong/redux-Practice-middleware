// 프로미스로 디스패치 하는 함수를 간단히 하기 위한 함수
export const createPromiseThunk = (type, promiseCreator) => {
  //배열 비구조화 할당을 통해 type 뒷 부분에 문자열 추가
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

  const thunkCreator = (param) => async (dispatch) => {
    dispatch({ type });
    try {
      const payload = await promiseCreator(param);
      dispatch({ type: SUCCESS, payload });
    } catch (e) {
      // FSA (Flux Standard Action) 이라는 규칙으로 유틸 함수를 만들 때 유용하다
      // 모든 액션의 값들을 payload라는 것으로 통일 시킨다.
      // error 발생 했을 때는 error값을 true로 설정한다.
      // 그래서 payload에 e를 넣고 error에 true
      dispatch({ type: ERROR, payload: e, error: true });
    }
  };
  return thunkCreator;
};

// 같은 값들을 계속 변경하는 것에 대해 간단히 하기 위한 함수
export const reducerUtils = {
  initial: (data = null) => ({
    data,
    loading: false,
    error: null,
  }),
  loading: (prevState = null) => ({
    data: prevState,
    loading: true,
    error: null,
  }),
  success: (data) => ({
    data,
    loading: false,
    error: null,
  }),
  error: (error) => ({
    data: null,
    loading: false,
    error,
  }),
};

// 리듀서의 리턴값을을 간단히 하기 위한 유틸 함수
// --- keepData 로 기존의 데이터와 새 데이터를 비교하여 새로운 것을 가지고 오게 만들기
export const handleAsyncActions = (type, key, keepData) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return (state, action) => {
    switch (action.type) {
      case type:
        return {
          ...state,
          // 중괄호로 감싸면 key 값이 post일 떄는 post, posts일 떄는 posts로 바뀐다
          [key]: reducerUtils.loading(keepData ? state[key].data : null),
        };
      case SUCCESS:
        return {
          ...state,
          [key]: reducerUtils.success(action.payload),
        };
      case ERROR:
        return {
          ...state,
          [key]: reducerUtils.error(action.payload),
        };
      default:
        return state;
    }
  };
};
