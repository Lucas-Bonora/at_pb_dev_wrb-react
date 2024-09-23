'use client';

export const handleEditRequisicao = (requisicao, setProdutoId, setQuantidade, setDescricao, setIsEditing, setCurrentId) => {
    setProdutoId(requisicao.produtoId);
    setQuantidade(requisicao.quantidade);
    setDescricao(requisicao.descricao);
    setIsEditing(true);
    setCurrentId(requisicao.id);
};
