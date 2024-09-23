'use client';

export const getProdutoNome = (produtoId, listaProdutos) => {
    const produto = listaProdutos.find((f) => f.id === produtoId);
    return produto ? produto.nome : 'Desconhecido';
};
