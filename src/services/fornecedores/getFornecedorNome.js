
export const getFornecedorNome =  (
    fornecedorId,
    listaFornecedores,
                                  ) => {
    const fornecedor = listaFornecedores.find(f => f.id === fornecedorId);
    console.log(fornecedorId)
    console.log(listaFornecedores)
    return fornecedor ? fornecedor.nome : "Desconhecido";
};