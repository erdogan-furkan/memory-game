import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Confetti from "react-confetti";
import {
  selectFrameworks,
  selectOpenedFrameworks,
  check,
  selectIsChecking,
  selectScore,
  selectIsStarted,
  restart,
  selectIsFinished,
  selectIsStarting,
} from "../../redux/frameworks/frameworksSlice";
import Card from "../Card";
import CountDown from "../CountDown";

function CardList() {
  const dispatch = useDispatch();
  const frameworks = useSelector(selectFrameworks);
  const openedFrameworks = useSelector(selectOpenedFrameworks);
  const isChecking = useSelector(selectIsChecking);
  const score = useSelector(selectScore);
  const isStarted = useSelector(selectIsStarted);
  const isFinished = useSelector(selectIsFinished);
  const isStarting = useSelector(selectIsStarting);

  const [bestScore, setBestScore] = useState(
    localStorage.getItem("best-score") || 0
  );

  useEffect(() => {
    if (openedFrameworks.length === 2) {
      setTimeout(() => {
        dispatch(check(openedFrameworks));
      }, 500);
    }
  }, [openedFrameworks, dispatch]);

  useEffect(() => {
    if (score > bestScore) {
      localStorage.setItem("best-score", score);
      setBestScore(score);
    }
  }, [score, bestScore]);

  return (
    <>
      {!isFinished ? (
        <>
          <h1 style={{ textAlign: "center", userSelect: "none" }}>
            Frameworks Memory Game
          </h1>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              userSelect: "none",
            }}
          >
            <h2>Score: {score}</h2>
            {isStarted ? (
              <span
                style={{ cursor: "pointer" }}
                onClick={() => dispatch(restart())}
              >
                Restart game
              </span>
            ) : null}
          </div>

          {isStarting && <CountDown />}

          {!isStarting && (
            <div className="playground">
              {frameworks.map((framework) => (
                <Card
                  key={framework.id}
                  framework={framework}
                  disabled={isChecking}
                />
              ))}
            </div>
          )}
        </>
      ) : null}

      {isFinished ? <Confetti /> : null}
      {isFinished ? (
        <div
          className="playground"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1>Congratulations!</h1>
          <div>
            <p>Your score: {score}</p>
            <p>Your best score: {bestScore}</p>
          </div>
          <span
            style={{ cursor: "pointer", userSelect: "none", marginTop: "1rem" }}
            onClick={() => dispatch(restart())}
          >
            Play again
          </span>
        </div>
      ) : null}
    </>
  );
}

export default CardList;
