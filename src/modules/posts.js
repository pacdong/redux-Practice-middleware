// 가짜 api를 진행중인 상태 성공 상태 데이터 상태, 에러 상태 등을 관리하기

import * as postsAPI from "../api/posts";
import {
  createPromiseThunk,
  createPromiseThunkById,
  handleAsyncActions,
  handleAsyncActionsById,
  reducerUtils,
} from "../lib/asyncUtils";
import { call, put, takeEvery } from "redux-saga/effects";

// Actions

const GET_POSTS = "GET_POSTS";
const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS";
const GET_POSTS_ERROR = "GET_POSTS_ERROR";

const GET_POST = "GET_POST";
const GET_POST_SUCCESS = "GET_POST_SUCCESS";
const GET_POST_ERROR = "GET_POST_ERROR";

// post page에서 뒤로가기 후 새로운 page 진입시 기존 상태가 살짝 보이는 것을 방지하기 위한 액션
const CLEAR_POST = "CLEAR_POST";

// 선언한 액션 타입들에 대해서 Jenerator Actions 함수를 생성해도 되지만 정크에서 바로
// 정크에서 직접 디스패치 하는 형태로 작성해도 된다

// Redux-thunk 로 getPost구현
// export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts);
// // export const getPost = createPromiseThunk(GET_POST, postsAPI.getPostById);
// // post의 데이터 구조 바꾸기, id 값으로 해당 상태를 조회하기 위하여 meta값으로 id를 전달한다.
// export const getPost = createPromiseThunkById(GET_POST, postsAPI.getPostById);

// Redux-Saga로 getPost 구현
export const getPosts = () => ({ type: GET_POSTS });
export const getPost = (id) => ({ type: GET_POST, payload: id, meta: id });

function* getPostsSaga() {
  try {
    const posts = yield call(postsAPI.getPosts);
    yield put({ type: GET_POSTS_SUCCESS, payload: posts });
  } catch (e) {
    yield put({ type: GET_POSTS_ERROR, payload: e, error: true });
  }
}

function* getPostSaga(action) {
  const id = action.payload;
  try {
    const post = yield call(postsAPI.getPostById, id);
    yield put({
      type: GET_POST_SUCCESS,
      payload: post,
      meta: id,
    });
  } catch (e) {
    yield put({
      type: GET_POSTS_ERROR,
      payload: e,
      error: true,
      meta: id,
    });
  }
}

export function* postsSaga() {
  yield takeEvery(GET_POSTS, getPostsSaga);
  yield takeEvery(GET_POST, getPostSaga);
}

// 여기까지 Redux-Saga

export const goToHome = () => (dispatch, getState, { history }) => {
  history.push("/");
};

export const clearPost = () => ({ type: CLEAR_POST });

// initialState
const initialState = {
  posts: reducerUtils.initial(),
  post: {},
};

// 리듀서 유틸 함수를 가져와서 만든다
const getPostsReducer = handleAsyncActions(GET_POSTS, "posts", true);

// 데이터 구조를 바꾸기 위하여 이 부분도 직접 리듀서를 반영하는 형태로 작성한다.
// const getPostReducer = handleAsyncActions(GET_POST, "post");
// 3번째 파라미터 true는 로딩중에 데이터를 초기화 할지 말지를 결정해준다.
const getPostReducer = handleAsyncActionsById(GET_POST, "post", true);

// Reducer
export default function posts(state = initialState, action) {
  switch (action.type) {
    // 아래 3가지 케이스중 하나라면 리턴값을 반환한다.
    case GET_POSTS:
    case GET_POSTS_SUCCESS:
    case GET_POSTS_ERROR:
      return getPostsReducer(state, action);
    case GET_POST:
    case GET_POST_SUCCESS:
    case GET_POST_ERROR:
      return getPostReducer(state, action);
    case CLEAR_POST:
      return {
        ...state,
        post: reducerUtils.initial(),
      };
    default:
      return state;
  }
}
