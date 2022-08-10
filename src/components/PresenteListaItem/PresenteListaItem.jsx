import { ActionMode } from "constants/index";
import "./PresenteListaItem.css";

function PresenteListaItem({
  presente,
  presenteSelecionado,
  index,
  onRemove,
  onAdd,
  clickItem,
  mode,
}) {
  const badgeCounter = (canRender, index) =>
    Boolean(canRender) && (
      <span className="PresenteListaItem__badge"> {presenteSelecionado} </span>
    );

  const removeButton = (canRender, index) =>
    Boolean(canRender) && (
      <button
        disabled={mode !== ActionMode.NORMAL}
        className="Acoes__remover"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(index);
        }}
      >
        Remover
      </button>
    );

  const badgeAction = (canRender) => {
    if (canRender)
      return (
        <span
          className={`PresenteListaItem__tag ${
            mode === ActionMode.DELETAR && "PresenteListaItem__tag--deletar"
          }`}
        >
          {" "}
          {mode}{" "}
        </span>
      );
  };

  return (
    <div
      className={`PresenteListaItem
      ${mode !== ActionMode.NORMAL && "PresenteListaItem--disable"}
      ${mode === ActionMode.DELETAR && "PresenteListaItem--deletar"}`}
      onClick={() => clickItem(presente.id)}
    >
      {badgeCounter(presenteSelecionado, index)}
      <div>
        <div className="PresenteListaItem__titulo">{presente.titulo}</div>
        <div className="PresenteListaItem__preco">
          {" "}
          R$ {presente.preco.toFixed(2)}
        </div>
        <div className="PresenteListaItem__marca">{presente.marca}</div>
        <div className="PresenteListaItem__acoes Acoes">
          <button
            disabled={mode !== ActionMode.NORMAL}
            className={`Acoes__adicionar ${
              !presenteSelecionado && "Acoes__adicionar--preencher"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onAdd(index);
            }}
          >
            Presentear
          </button>

          {removeButton(presenteSelecionado, index)}
          {badgeAction(mode !== ActionMode.NORMAL)}
        </div>
      </div>
      <img
        className="PresenteListaItem__foto"
        src={presente.foto}
        alt={`${presente.produto}`}
      />
    </div>
  );
}

export default PresenteListaItem;
