// 가짜 api를 진행중인 상태 성공 상태 데이터 상태, 에러 상태 등을 관리하기

import * as postsAPI from "../api/posts";

// Actions

const GET_POSTS = "GET_POSTS";
const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS";
const GET_POSTS_ERROR = "GET_POSTS_ERROR";

const GET_POST = "GET_POST";
const GET_POST_SUCCESS = "GET_POST_SUCCESS";
const GET_POST_ERROR = "GET_POST_ERROR";

// 선언한 액션 타입들에 대해서 Jenerator Actions 함수를 생성해도 되지만 정크에서 바로
// 정크에서 직접 디스패치 하는 형태로 작성해도 된다

export const getPOSTS = () => async (dispatch) => {
  // 요청이 시작됨
  dispatch({ type: GET_POSTS });
  // API를 호출
  try {
    const posts = await postsAPI.getPosts();
    // 성공했을 때
    // 받아온 posts 값을 액션안에 넣어서 디스패치 한다
    dispatch({
      type: GET_POSTS_SUCCESS,
      posts,
    });
  } catch (e) {
    // 실패했을 떄
    dispatch({ type: GET_POSTS_ERROR, error: e });
  }
};

export const getPost = (id) => async (dispatch) => {
  //요청이 시작됨
  dispatch({ type: GET_POST });
  // API 호출
  try {
    //성공시 작업
    const post = await postsAPI.getPostById(id);
    dispatch({ type: GET_POST_SUCCESS, post });
  } catch (e) {
    // 실패시 작업
    dispatch({ type: GET_POST_ERROR, error: e });
  }
};

// initialState
const initialState = {
  posts: {
    loading: false,
    data: null,
    error: null,
  },
  post: {
    loading: false,
    data: null,
    error: null,
  },
};

// Reducer
export default function posts(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: {
          loading: true,
          data: null,
          error: null,
        },
      };
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: {
          loading: false,
          data: action.posts,
          error: null,
        },
      };
    case GET_POSTS_ERROR:
      return {
        ...state,
        posts: {
          loading: false,
          data: null,
          error: action.error,
        },
      };
    case GET_POST:
      return {
        ...state,
        post: {
          loading: true,
          data: null,
          error: null,
        },
      };
    case GET_POST_SUCCESS:
      return {
        ...state,
        post: {
          loading: false,
          data: action.posts,
          error: null,
        },
      };
    case GET_POST_ERROR:
      return {
        ...state,
        post: {
          loading: false,
          data: null,
          error: action.error,
        },
      };
    default:
      return state;
  }
}
