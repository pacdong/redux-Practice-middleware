import React from "react";
import { Route } from "react-router-dom";
import PostListPage from "./pages/PostListPage";
import PostPage from "./pages/PostPage";
import CounterContainer from "./Containers/CounterContainer";

function App() {
  return (
    <>
      <CounterContainer />
      <Route path="/" exact component={PostListPage} />
      <Route path="/:id" exact component={PostPage} />
    </>
  );
}

export default App;
