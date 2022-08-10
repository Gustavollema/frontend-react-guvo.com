import "./Overlay.css";

function Overlay({ children, abrirModal }) {
  return (
    <div className="Overlay" onClick={() => abrirModal()}>
      {children}
    </div>
  );
}

export default Overlay;
