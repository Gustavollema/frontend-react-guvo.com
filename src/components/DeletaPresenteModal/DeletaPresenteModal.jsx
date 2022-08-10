import "./DeletaPresenteModal.css";
import Modal from "components/Modal/Modal";
import { PresenteService } from "Services/PresenteService";

function DeletaPresenteModal({
  fecharModal,
  presenteParaDeletar,
  onDeletePresente,
}) {
  const handleDelete = async (presente) => {
    await PresenteService.deleteById(presente.id);
    onDeletePresente(presente);
    fecharModal();
  };

  return (
    <Modal fecharModal={fecharModal}>
      <div className="DeletaPresenteModal">
        <h2>Confirmação</h2>
        <p>
          Você realmente deseja remover <b>{presenteParaDeletar.titulo}</b> da
          lista?
        </p>

        <img
          className="DeletaPresenteModal__foto"
          src={presenteParaDeletar.foto}
          alt={presenteParaDeletar.titulo}
        />

        <br />

        <div>
          <button
            onClick={() => handleDelete(presenteParaDeletar)}
            className="DeletaPresenteModal__confirmar"
          >
            {" "}
            Confirmar{" "}
          </button>
          <button
            onClick={fecharModal}
            className="DeletaPresenteModal__cancelar"
          >
            {" "}
            Cancelar{" "}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default DeletaPresenteModal;
