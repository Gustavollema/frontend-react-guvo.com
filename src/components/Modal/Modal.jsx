import "./Modal.css";
import Overlay from "components/Overlay/Overlay";

function Modal({ children, fecharModal }) {
  const handleClick = (e, canClose) => {
    e.stopPropagation();
    if (canClose) fecharModal();
  };

  return (
    <Overlay overlayClick={fecharModal}>
      <div className="Modal" onClick={handleClick}>
        <span className="Modal__fechar" onClick={(e) => handleClick(e, true)}>
          +
        </span>
        <div className="Modal__body">{children}</div>
      </div>
    </Overlay>
  );
}

export default Modal;