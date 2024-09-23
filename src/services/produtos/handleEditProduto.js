export const handleEditProduto = (
    produto,
    setNomeProduto,
    setDescricaoProduto,
    setIsEditing,
    setCurrentId
) => {
    setNomeProduto(produto.nome);
    setDescricaoProduto(produto.descricao);
    setIsEditing(true);
    setCurrentId(produto.id);
};