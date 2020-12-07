import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Post from "../Components/Post";
import { reducerUtils } from "../lib/asyncUtils";
import { getPost, goToHome } from "../modules/posts";

function PostContainer({ postId }) {
  // 초기에 state.posts.[postId] 값이 없을 경우를 대비해서 올 연산자로 리듀서의 초기값을 가져온다.
  const { data, loading, error } = useSelector(
    (state) => state.posts.post[postId] || reducerUtils.initial()
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) return;
    dispatch(getPost(postId));
  }, [postId, dispatch, data]);

  if (loading && !data) return <div>로딩중...</div>;
  if (error) return <div>에러 발생!</div>;
  if (!data) return null;

  return (
    <>
      <button onClick={() => dispatch(goToHome())}>홈으로 이동</button>
      <Post post={data} />
    </>
  );
}

export default PostContainer;
