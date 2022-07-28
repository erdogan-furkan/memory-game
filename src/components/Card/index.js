import { useDispatch } from "react-redux";
import { setOpened } from "../../redux/frameworks/frameworksSlice";

function Card({ framework, disabled }) {
  const dispatch = useDispatch();

  return (
    <div
      className={`card ${
        framework.opened ? "opened" : framework.finalized ? "matched" : null
      }`}
      onClick={() =>
        disabled || framework.opened || framework.finalized
          ? false
          : dispatch(setOpened(framework.id))
      }
    >
      <div className="front">?</div>
      <div className="back">
        <img
          src={`https://raw.githubusercontent.com/samiheikki/javascript-guessing-game/master/static/logos/${framework.name}.png`}
          alt={framework.name}
        />
      </div>
    </div>
  );
}

export default Card;
