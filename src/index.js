import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import rootReducer, { rootSaga } from "./modules/index";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import ReduxThunk from "redux-thunk";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import createSagaMiddleware from "redux-saga";

const customHistory = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware({
  // saga에서 history 조회하기
  context: {
    history: customHistory,
  },
});

// 리덕스 정크랑 로거 사용시 로거를 제일 마지막에 위치 시킴
// 아니면 액션으로 간주해서 중간에 실행함

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      sagaMiddleware,
      ReduxThunk.withExtraArgument({ history: customHistory }),
      logger
    )
  )
);

// 루트사가를 등록해야한다.
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    <Router history={customHistory}>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
