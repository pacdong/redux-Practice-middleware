import React from "react";
import Counter from "../Components/Counter";
import { useSelector, useDispatch } from "react-redux";
import { increaseAsync, decreaseAync } from "../modules/counter";

const CounterContainer = () => {
  const number = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  const onIncrease = () => {
    dispatch(increaseAsync());
  };
  const onDecrease = () => {
    dispatch(decreaseAync());
  };
  return (
    <Counter number={number} onIncrease={onIncrease} onDecrease={onDecrease} />
  );
};

export default CounterContainer;
