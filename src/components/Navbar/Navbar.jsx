import { ActionMode } from "constants/index";
import "./Navbar.css";

function Navbar({ createPresente, updatePresente, mode, deletePresente }) {
  return (
    <>
      <section className="container-navbar">
        <img id="logo-guvo" src="../assets/images/logo.png" alt=""></img>
        <div className="menu">
          <button
            type="button"
            className={`btn_menu ${
              mode === ActionMode.ATUALIZAR && "Presente--ativa"
            }`}
            onClick={() => updatePresente()}
          >
            Editar
          </button>

          <button
            type="button"
            className={`btn_menu ${
              mode === ActionMode.DELETAR && "Presente--deletar"
            }`}
            onClick={() => deletePresente()}
          >
            Deletar
          </button>
          <button
            type="button"
            className="btn_menu"
            onClick={() => createPresente()}
          >
            Adicionar
          </button>
        </div>
      </section>
    </>
  );
}

export default Navbar;
