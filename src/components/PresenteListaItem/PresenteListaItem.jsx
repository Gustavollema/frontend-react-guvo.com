import { ActionMode } from "constants/index";
import "./PresenteListaItem.css";

function PresenteListaItem({
  presente,
  presenteSelecionada,
  index,
  onRemove,
  onAdd,
  clickItem,
  mode,
}) {
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
      <div>
        <div className="PresenteItem__titulo">{presente.titulo}</div>
        <div className="PresenteItem__preco">
          {" "}
          R$ {presente.preco.toFixed(2)}
        </div>
        <div className="PresenteItem__marca">{presente.marca}</div>
        <div className="PresenteItem__acoes Acoes">
          <button
            disabled={mode !== ActionMode.NORMAL}
            className={`Acoes__adicionar ${
              !presenteSelecionada && "Acoes__adicionar--preencher"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onAdd(index);
            }}
          >
            Presentear
          </button>

          {removeButton(presenteSelecionada, index)}
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