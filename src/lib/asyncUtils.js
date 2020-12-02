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
