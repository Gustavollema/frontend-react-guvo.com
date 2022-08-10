import "./PresenteDetalhesModal.css";
import Modal from "components/Modal/Modal";

function PresentesDetalhesModal({ presente, fecharModal }) {
  return (
    <Modal fecharModal={fecharModal}>
      <div className="PresentesDetalhesModal">
        <div>
          <div className="PresentesDetalhesModal__titulo">
            {" "}
            {presente.titulo}{" "}
          </div>
          <div className="PresentesDetalhesModal__preco">
            R$ {Number(presente.preco).toFixed(2)}
          </div>
          <div className="PresentesDetalhesModal__produto">
            <b>Produto:</b> {presente.produto}
          </div>
          <div className="PresentesDetalhesModal__marca">
            <b>Marca:</b> {presente.marca}
          </div>
        </div>
        <img
          className="PresentesDetalhesModal__foto"
          src={presente.foto}
          alt={`${presente.produto}`}
        />
      </div>
    </Modal>
  );
}

export default PresentesDetalhesModal;
