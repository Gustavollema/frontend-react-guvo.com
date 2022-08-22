import { useState, useEffect } from "react";
import Modal from "components/Modal/Modal";
import "./AdicionaEditaPresenteModal.css";
import { PresenteService } from "Services/PresenteService";
import { ActionMode } from "constants/index";

function AdicionaEditaPresenteModal({
  fecharModal,
  onCreatePresente,
  mode,
  presenteToUpdate,
  onUpdatePresente,
}) {
  const form = {
    produto: presenteToUpdate?.produto ?? "",
    marca: presenteToUpdate?.marca ?? "",
    preco: presenteToUpdate?.preco ?? "",
    foto: presenteToUpdate?.foto ?? "",
  };

  const [state, setState] = useState(form);
  const [canDesable, setCanDesable] = useState(true);

  const canDesableSendButton = () => {
    const response = !Boolean(state.foto.length && String(state.preco).length);
    setCanDesable(response);
  };

  const handleChange = (e, name) => {
    setState({ ...state, [name]: e.target.value });
  };

  useEffect(() => {
    canDesableSendButton();
  });

  const handleSend = async () => {
    const renomeiaCaminhoFoto = (fotoPath) => fotoPath.split(/\\|\//).pop();

    const { produto, marca, preco, foto } = state;

    const titulo = produto;

    const presente = {
      ...(presenteToUpdate && { _id: presenteToUpdate?.id }),
      produto: titulo,
      marca,
      preco,
      foto: `assets/images/${renomeiaCaminhoFoto(foto)}`,
    };

    const serviceCall = {
      [ActionMode.NORMAL]: () => PresenteService.create(presente),
      [ActionMode.ATUALIZAR]: () =>
        PresenteService.updtateById(presenteToUpdate?.id, presente),
    };

    const response = await serviceCall[mode]();

    const actionResponse = {
      [ActionMode.NORMAL]: () => onCreatePresente(response),
      [ActionMode.ATUALIZAR]: () => onUpdatePresente(response),
    };

    actionResponse[mode]();

    const reset = {
      produto: "",
      preco: '',
      marca: "",
      foto: "",
    };

    setState(reset);

    fecharModal();
  };

  return (
    <Modal fecharModal={fecharModal}>
      <div className="AdicionaPresenteModal">
        <form autoComplete="off">
          <h2>
            {" "}
            {ActionMode.ATUALIZAR === mode
              ? "Atualizar"
              : "Adicionar à"} Lista{" "}
          </h2>
          <div>
            <label className="AdicionaPresenteModal__text" htmlFor="preco">
              {" "}
              Preco:{" "}
            </label>
            <input
              id="preco"
              placeholder="10,00"
              type="text"
              value={state.preco}
              required
              onChange={(e) => handleChange(e, "preco")}
            />
          </div>
          <div>
            <label className="AdicionaPresenteModal__text" htmlFor="produto">
              {" "}
              Produto:{" "}
            </label>
            <input className="input-produto"
              id="produto"
              placeholder="Geladeira, por exemplo"
              type="text"
              value={state.produto}
              required
              onChange={(e) => handleChange(e, "produto")}
            />
          </div>
          <div></div>
          <div>
            <label className="AdicionaPresenteModal__text" htmlFor="marca">
              {" "}
              Marca:{" "}
            </label>
            <input
              id="marca"
              placeholder="Qual fabricante?"
              type="text"
              value={state.marca}
              required
              onChange={(e) => handleChange(e, "marca")}
            />
          </div>
          <div>
            <label
              className="AdicionaPresenteModal__text  AdicionaPresenteModal__foto-label"
              htmlFor="foto"
            >
              {!state.foto.length ? "Selecionar Imagem" : state.foto}
            </label>
            <input
              className=" AdicionaPresenteModal__foto"
              id="foto"
              type="file"
              accept="image/png, image/gif, image/jpeg"
              required
              onChange={(e) => handleChange(e, "foto")}
            />
          </div>

          <button
            type="submit"
            disabled={canDesable}
            className="AdicionaPresenteModal__enviar"
            onClick={handleSend}
          >
            {ActionMode.NORMAL === mode ? "Enviar" : "Atualizar"}
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default AdicionaEditaPresenteModal;
