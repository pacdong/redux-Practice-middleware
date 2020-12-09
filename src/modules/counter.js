import { delay, put, takeEvery, takeLatest } from "redux-saga/effects"; // effects라는 것은 리덕스 사가 미들웨어가 명령어를 수행하도록 명령하는 것이다

//Redux-saga로 만든 비동기 카운터
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";
const INCREASE_ASYNC = "INCREASE_ASYNC";
const DECREASE_ASYNC = "DECREASE_ASYNC";

export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });
export const increaseAsync = () => ({ type: INCREASE_ASYNC });
export const decreaseAsync = () => ({ type: DECREASE_ASYNC });

// saga 작성 , Generator 함수로 작성
function* increaseSaga() {
  yield delay(1000);
  yield put(increase());
}

function* decreaseSaga() {
  yield delay(1000);
  yield put(decrease());
}

// takeEvery : 특정 액션이 들어올 때마다 항상 함수를 실행하겠다
// takeLatest : 가장 마지막으로 들어온 것만 처리하겠다.
// takeLeading : 가장 먼저 들어온 것만 처리하겠다.
// 내보내줘야한다. 루트 사가를 만들 것이다.
export function* counterSaga() {
  yield takeEvery(INCREASE_ASYNC, increaseSaga);
  yield takeLatest(DECREASE_ASYNC, decreaseSaga);
}

const initialState = 0;

export default function couter(state = initialState, action) {
  switch (action.type) {
    case INCREASE:
      return state + 1;
    case DECREASE:
      return state - 1;
    default:
      return state;
  }
}

// Redux-Thunk 함수로 만든 비동기 카운터
// // Actions
// const INCREASE = "INCREASE";
// const DECREASE = "DECREASE";

// // Action Jenerators
// export const increase = () => ({ type: INCREASE });
// export const decrease = () => ({ type: DECREASE });

// // 정크 함수, 특정 액션이 발생시에 몇 초 뒤에 뭐 하는것
// export const increaseAsync = () => (dispatch) => {
//   setTimeout(() => {
//     dispatch(increase());
//   }, 1000);
// };

// export const decreaseAync = () => (dispatch) => {
//   setTimeout(() => {
//     dispatch(decrease());
//   }, 1000);
// };

// // inicialState
// const inicialState = 0;

// // Reducer
// export default function couter(state = inicialState, action) {
//   switch (action.type) {
//     case INCREASE:
//       return state + 1;
//     case DECREASE:
//       return state - 1;
//     default:
//       return state;
//   }
// }
