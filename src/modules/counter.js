// Actions
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";

// Action Jenerators
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

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
