import axios from "axios";

export const getPosts = async () => {
  const response = await axios.get("http://localhost:4000/posts");
  return response.data;
};

export const getPostById = async (id) => {
  const response = await axios.get(`http://localhost:4000/posts/${id}`);
  return response.data;
};

// 가짜 api 함수
// const sleep = (n) => new Promise((resolve) => setTimeout(resolve, n));

// const posts = [
//   {
//     id: 1,
//     title: "리덕스 미들웨어",
//     body: "리덕스 메들웨어 테스트하기",
//   },
//   {
//     id: 2,
//     title: "리덕스 thunk 사용하기",
//     body: "redux-thunk를 사용하여 비동기 작업 처리하기",
//   },
//   {
//     id: 3,
//     title: "리덕스 saga도 사용하기",
//     body: "redux-saga를 사용해서 비동기 작업을 처리하는 방법도 배우기",
//   },
// ];

// export const getPosts = async () => {
//   await sleep(500);
//   return posts;
// };

// export const getPostById = async (id) => {
//   await sleep(500);
//   return posts.find((post) => post.id === id);
// };
