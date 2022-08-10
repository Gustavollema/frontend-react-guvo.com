const PresenteContext = {
  presenteEndpoint: () => `${Api.baseUrl}/presentes`,
  presenteLista: () => `${PresenteContext.presenteEndpoint()}/find-presentes`,
  presenteById: (id) =>
    `${PresenteContext.presenteEndpoint()}/find-presente/${id}`,
  createPresente: () => `${PresenteContext.presenteEndpoint()}/create`,
  updatePresenteById: (id) =>
    `${PresenteContext.presenteEndpoint()}/update/${id}`,
  deletePresenteById: (id) =>
    `${PresenteContext.presenteEndpoint()}/delete/${id}`,
};

export const Api = {
  baseUrl: "http://localhost:3000",
  ...PresenteContext,
};
