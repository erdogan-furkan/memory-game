import "./styles.css";

function Modal() {
  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <span
          className="close"
          onClick={() =>
            (document.getElementById("myModal").style.display = "none")
          }
        >
          &times;
        </span>
        <h1>Rules</h1>
        <p>Each correct gives 50 points, each wrong takes 10 points.</p>
      </div>
    </div>
  );
}

export default Modal;
