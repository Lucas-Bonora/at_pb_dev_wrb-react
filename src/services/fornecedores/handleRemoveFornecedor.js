'use client';

import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/config/firebase';

export const handleRemoveFornecedor = async (id, getFornecedores) => {
    const confirm = window.confirm('Deseja realmente remover este fornecedor?');
    if (!confirm) return;

    try {
        const fornecedorDoc = doc(db, 'fornecedores', id);
        await deleteDoc(fornecedorDoc);
        alert('Fornecedor removido com sucesso!');
        getFornecedores();
    } catch (error) {
        console.error('Erro ao remover fornecedor:', error);
        alert('Erro ao remover fornecedor.');
    }
};
