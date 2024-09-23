export const getContatoNome = (contatoId, listaContatos) => {
    const contato = listaContatos.find(f => f.id === contatoId);
    return contato ? contato.nome : "Desconhecido";
};