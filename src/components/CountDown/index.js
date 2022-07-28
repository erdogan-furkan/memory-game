import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsStarting } from "../../redux/frameworks/frameworksSlice";

function CountDown() {
  const dispatch = useDispatch();
  const [counter, setCounter] = useState(3);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => setCounter((c) => c - 1), 1000);
    setIntervalId(interval);
  }, []);

  useEffect(() => {
    if (counter === 0) {
      setTimeout(() => dispatch(setIsStarting()), 1000);
      return clearInterval(intervalId);
    }
  }, [counter, intervalId, dispatch]);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>
        {counter > 0 ? counter : "Shuffling..."}
      </h1>
    </div>
  );
}

export default CountDown;
