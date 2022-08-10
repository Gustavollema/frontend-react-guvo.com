import './PresenteLista.css'
import React, {useState, useEffect, useCallback} from 'react';
import PresenteListaItem from 'components/PresenteListaItem/PresenteListaItem';
import { PresenteService } from 'Services/PresenteService';
import PresenteDetalhesModal from 'components/PresenteDetalhesModal/PresenteDetalhesModal';


import { ActionMode } from "constants/index";

function PresenteLista({ presenteCriado, 
  mode, 
  updatePresente, 
  deletePresente, 
  presenteEditado, 
  presenteRemovido }) {

  const [presentes, setPresentes] = useState([]);

  const [presenteEscolhida, setPresenteEscolhida] = useState({});

  const [presenteModal, setPresenteModal] = useState(false);

  const adicionarPresente = (presenteIndex) => {
    const presente = {[presenteIndex]: Number(presenteEscolhida[presenteIndex] || 0) + 1 };
    setPresenteEscolhida({ ...presenteEscolhida, ...presente });
  }
    
    const removerPresente = (presenteIndex) => {
    const presente = {[presenteIndex]: Number(presenteEscolhida[presenteIndex] || 0) - 1 };
    setPresenteEscolhida({ ...presenteEscolhida, ...presente });
    }

    const getLista = async () => {
      const response = await PresenteService.getLista();
      setPresentes(response);
    };

    const getPresenteById = async (presenteId) => {
      const response = await PresenteService.getById(presenteId);
      setPresenteModal(response);
      const mapper = {
        [ActionMode.NORMAL]: () => setPresenteModal(response),
        [ActionMode.ATUALIZAR]: () => updatePresente(response),
        [ActionMode.DELETAR]: () => deletePresente(response),
      };
  
      mapper[mode]();
    };

    const adicionaPresenteNaLista = useCallback(
      (presente) => {
        const lista = [...presentes, presente];
        setPresentes(lista);
      },
      [presentes]
    );

    useEffect(() => {
      if (
        presenteCriado &&
        !presentes.map(({ id }) => id).includes(presenteCriado.id)
      ) {
        adicionaPresenteNaLista(presenteCriado);
      }
    }, [adicionaPresenteNaLista, presenteCriado, presentes]);


    useEffect(() => {
      getLista();
    }, [presenteEditado, presenteRemovido]);

    return <div className="PresenteLista">
    {presentes.map((presente, index) => 
     
    <PresenteListaItem  
    mode={mode}
    key={`PresenteListaItem-${index}`} 
    presente={presente}
    presenteSelecionado={presenteEscolhida[index]}
    index={index}
    onRemove={index => removerPresente(index)}
    onAdd={index => adicionarPresente(index)}
    clickItem={(presenteId) => getPresenteById(presenteId)

    }/>
  
    )}
    {presenteModal && <PresenteDetalhesModal presente={presenteModal} fecharModal={() => setPresenteModal(false)} />}

 </div>
};

export default PresenteLista;