// 가짜 api를 진행중인 상태 성공 상태 데이터 상태, 에러 상태 등을 관리하기

import * as postsAPI from "../api/posts";
import { createPromiseThunk, reducerUtils } from "../lib/asyncUtils";

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

// Reducer
export default function posts(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: reducerUtils.loading(),
      };
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: reducerUtils.success(action.payload),
      };
    case GET_POSTS_ERROR:
      return {
        ...state,
        posts: reducerUtils.error(action.payload),
      };
    case GET_POST:
      return {
        ...state,
        post: reducerUtils.loading(),
      };
    case GET_POST_SUCCESS:
      return {
        ...state,
        post: reducerUtils.success(action.payload),
      };
    case GET_POST_ERROR:
      return {
        ...state,
        post: reducerUtils.error(action.payload),
      };
    default:
      return state;
  }
}
