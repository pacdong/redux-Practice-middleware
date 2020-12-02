// 가짜 api를 진행중인 상태 성공 상태 데이터 상태, 에러 상태 등을 관리하기

import * as postsAPI from "../api/posts";
import {
  createPromiseThunk,
  handleAsyncActions,
  reducerUtils,
} from "../lib/asyncUtils";

// Actions

const GET_POSTS = "GET_POSTS";
const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS";
const GET_POSTS_ERROR = "GET_POSTS_ERROR";

const GET_POST = "GET_POST";
const GET_POST_SUCCESS = "GET_POST_SUCCESS";
const GET_POST_ERROR = "GET_POST_ERROR";

// 선언한 액션 타입들에 대해서 Jenerator Actions 함수를 생성해도 되지만 정크에서 바로
// 정크에서 직접 디스패치 하는 형태로 작성해도 된다

export const getPOSTS = createPromiseThunk(GET_POSTS, postsAPI.getPosts);
export const getPost = createPromiseThunk(GET_POST, postsAPI.getPostById);

// initialState
const initialState = {
  posts: reducerUtils.initial(),
  post: reducerUtils.initial(),
};

// 리듀서 유틸 함수를 가져와서 만든다
const getPostsReducer = handleAsyncActions(GET_POSTS, "posts");
const getPostReducer = handleAsyncActions(GET_POST, "post");

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
    default:
      return state;
  }
}
