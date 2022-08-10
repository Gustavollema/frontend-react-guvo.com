import './Home.css'
import PresenteLista from "components/PresenteLista/PresenteLista";
import AdicionaEditaPresenteModal from "components/AdicionaEditaPresenteModal/AdicionaEditaPresenteModal";
import Navbar from "components/Navbar/Navbar";
import { useState } from "react";
import { ActionMode } from "constants/index";
import DeletaPresenteModal from "components/DeletaPresenteModal/DeletaPresenteModal";


function Home() {
    const [presenteEditado, setPresenteEditado] = useState();
    const [canShowAdicionaPresenteModal, setCanShowAdicionaModal] =
      useState(false);
    const [presenteParaAdicionar, setPresenteParaAdicionar] = useState();
    const [presenteRemovido, setPresenteRemovido] = useState();
  
    const [modoAtual, setModoAtual] = useState(ActionMode.NORMAL);
  
    const handleActions = (action) => {
      const newAction = modoAtual === action ? ActionMode.NORMAL : action;
      setModoAtual(newAction);
    };
  
    const [presenteParaEditar, setPresenteParaEditar] = useState();
    const [presenteParaDeletar, setPresenteParaDeletar] = useState();
  
    const handleDeletePresente = (presenteToDelete) => {
      setPresenteParaDeletar(presenteToDelete);
  
    };
  
    const handleUpdatePresente = (presenteToUpdate) => {
      setPresenteParaEditar(presenteToUpdate);
      setCanShowAdicionaModal(true);
    };
  
    const handleCloseModal = () => {
      setCanShowAdicionaModal(false);
      setPresenteParaAdicionar();
      setPresenteParaDeletar();
      setPresenteParaEditar();
      setModoAtual(ActionMode.NORMAL);
    };
  
    return (
      <div className="Home">
        <Navbar
          mode={modoAtual}
          createPresente={() => setCanShowAdicionaModal(true)}
          deletePresente={() => handleActions(ActionMode.DELETAR)}
          updatePresente={() => handleActions(ActionMode.ATUALIZAR)}
        />
        <div className="Home__container">
          <PresenteLista
            mode={modoAtual}
            presenteCriado={presenteParaAdicionar}
            presenteEditado={presenteEditado}
            presenteRemovido={presenteRemovido}
            deletePresente={handleDeletePresente}
            updatePresente={handleUpdatePresente}
            
          />
          {canShowAdicionaPresenteModal && (
            <AdicionaEditaPresenteModal
              mode={modoAtual}
              presenteToUpdate={presenteParaEditar}
              onUpdatePresente={(presente) => setPresenteEditado(presente)}
              fecharModal={handleCloseModal}
              onCreatePresente={(presente) => setPresenteRemovido(presente)}
            />
          )}
          {presenteParaDeletar && (
            <DeletaPresenteModal
              presenteParaDeletar={presenteParaDeletar}
              fecharModal={handleCloseModal}
              onDeletePresente={(presente) => setPresenteRemovido(presente)}
            />
          )}
        </div>
      </div>
    );
  }
  
  export default Home;
  