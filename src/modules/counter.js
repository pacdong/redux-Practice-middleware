// Actions
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";

// Action Jenerators
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

// 정크 함수, 특정 액션이 발생시에 몇 초 뒤에 뭐 하는것
export const increaseAsync = () => (dispatch) => {
  setTimeout(() => {
    dispatch(increase());
  }, 1000);
};

export const decreaseAync = () => (dispatch) => {
  setTimeout(() => {
    dispatch(decrease());
  }, 1000);
};

// inicialState
const inicialState = 0;

// Reducer
export default function couter(state = inicialState, action) {
  switch (action.type) {
    case INCREASE:
      return state + 1;
    case DECREASE:
      return state - 1;
    default:
      return state;
  }
}
