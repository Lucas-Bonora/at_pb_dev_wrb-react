export const handleEditContato = (
    contato,
    setNomeContato,
    setEmail,
    setTelefone,
    setFornecedorId,
    setIsEditing,
    setCurrentId
) => {
    setNomeContato(contato.nome);
    setEmail(contato.email);
    setTelefone(contato.telefone);
    setFornecedorId(contato.fornecedorId)
    setIsEditing(true);
    setCurrentId(contato.id);
};