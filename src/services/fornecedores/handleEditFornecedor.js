'use client';

export const handleEditFornecedor = (fornecedor, setNomeFornecedor, setCepFornecedor, setIsEditing, setCurrentId) => {
    setNomeFornecedor(fornecedor.nome);
    setCepFornecedor(fornecedor.cep);
    setIsEditing(true);
    setCurrentId(fornecedor.id);
};
