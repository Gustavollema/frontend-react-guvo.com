import { Api } from "helpers/Api";

const parseResponse = (response) => response.json();

const transformPresente = (presente) => {
  const [produto] = presente.produto.split(" com ");

  return {
    ...presente,
    id: presente._id,
    titulo: presente.produto,
    produto,
  };
};

const parseTransformLista = (response) =>
  parseResponse(response).then((presentes) => presentes.map(transformPresente));

const parseTransformItem = (response) =>
  parseResponse(response).then(transformPresente);

export const PresenteService = {
  getLista: () =>
    fetch(Api.presenteLista(), { method: "GET" }).then(parseTransformLista),
  getById: (id) =>
    fetch(Api.presenteById(id), { method: "GET" }).then(parseTransformItem),
  create: (presente) =>
    fetch(Api.createPresente(), {
      method: "POST",
      body: JSON.stringify(presente),
      mode: "cors",
      headers: { "Content-Type": "application/json" },
    }).then(parseTransformItem),

  updtateById: (id, presente) =>
    fetch(Api.updatePresenteById(id), {
      method: "PUT",
      body: JSON.stringify(presente),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(parseResponse),

  deleteById: (id) =>
    fetch(Api.deletePresenteById(id), { method: "DELETE" }).then(parseResponse),
};

export default PresenteService;
