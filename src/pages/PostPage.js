// @flow
import * as React from "react";
import PostContainer from "../Containers/PostContainer";

const PostPage = ({ match }) => {
  // url은 문자열인데 저장해놓은 id는 숫자이기에 문자열을 숫자로 바꾸어 주어야 한다.
  const { id } = match.params;
  const postId = parseInt(id, 10);

  return <PostContainer postId={postId} />;
};

export default PostPage;
