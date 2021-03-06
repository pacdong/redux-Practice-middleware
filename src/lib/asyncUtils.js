import { call, put } from "redux-saga/effects";

//Redux-Saga로 구현한 createPromise
export const createPromiseSaga = (type, promiseCreator) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return function* saga(action) {
    try {
      const result = yield call(promiseCreator, action.payload);
      yield put({
        type: SUCCESS,
        payload: result,
      });
    } catch (e) {
      yield put({
        type: ERROR,
        error: true,
        payload: e,
      });
    }
  };
};

export const createPromiseSagaById = (type, promiseCreator) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return function* saga(action) {
    const id = action.meta;
    try {
      const result = yield call(promiseCreator, action.payload);
      yield put({
        type: SUCCESS,
        payload: result,
        meta: id,
      });
    } catch (e) {
      yield put({
        type: ERROR,
        error: true,
        payload: e,
        meta: id,
      });
    }
  };
};

// Redux-Thunk로 구현한 createPromise
// // 프로미스로 디스패치 하는 함수를 간단히 하기 위한 함수
// export const createPromiseThunk = (type, promiseCreator) => {
//   //배열 비구조화 할당을 통해 type 뒷 부분에 문자열 추가
//   const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

//   const thunkCreator = (param) => async (dispatch) => {
//     dispatch({ type });
//     try {
//       const payload = await promiseCreator(param);
//       dispatch({ type: SUCCESS, payload });
//     } catch (e) {
//       // FSA (Flux Standard Action) 이라는 규칙으로 유틸 함수를 만들 때 유용하다
//       // 모든 액션의 값들을 payload라는 것으로 통일 시킨다.
//       // error 발생 했을 때는 error값을 true로 설정한다.
//       // 그래서 payload에 e를 넣고 error에 true
//       dispatch({ type: ERROR, payload: e, error: true });
//     }
//   };
//   return thunkCreator;
// };

// // id값을 받아와서 직접 디스패치 하는 것을 한줄로 간단히 하기 위한 함수
// const defaultIdSelector = (param) => param;

// export const createPromiseThunkById = (
//   type,
//   promiseCreator,
//   idSelector = defaultIdSelector
// ) => {
//   const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

//   const thunkCreator = (param) => async (dispatch) => {
//     const id = idSelector(param);
//     dispatch({ type, meta: id });
//     try {
//       const payload = await promiseCreator(param);
//       dispatch({ type: SUCCESS, payload, meta: id });
//     } catch (e) {
//       // FSA (Flux Standard Action) 이라는 규칙으로 유틸 함수를 만들 때 유용하다
//       // 모든 액션의 값들을 payload라는 것으로 통일 시킨다.
//       // error 발생 했을 때는 error값을 true로 설정한다.
//       // 그래서 payload에 e를 넣고 error에 true
//       dispatch({ type: ERROR, payload: e, error: true, meta: id });
//     }
//   };
//   return thunkCreator;
// };

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

export const handleAsyncActionsById = (type, key, keepData) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return (state, action) => {
    const id = action.meta;
    switch (action.type) {
      case type:
        return {
          ...state,
          // 중괄호로 감싸면 key 값이 post일 떄는 post, posts일 떄는 posts로 바뀐다
          [key]: {
            ...state[key],
            [id]: reducerUtils.loading(
              keepData ? state[key][id] && state[key].data : null
            ),
          },
        };
      case SUCCESS:
        return {
          ...state,
          [key]: {
            ...state[key],
            [id]: reducerUtils.success(action.payload),
          },
        };
      case ERROR:
        return {
          ...state,
          [key]: {
            ...state[key],
            [id]: reducerUtils.error(action.payload),
          },
        };
      default:
        return state;
    }
  };
};
