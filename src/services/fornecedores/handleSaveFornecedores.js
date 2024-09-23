'use client';

import { addDoc, updateDoc, doc, collection } from 'firebase/firestore';
import { db } from '@/config/firebase';

export const handleSaveFornecedores = async ({
                                     nomeFornecedor,
                                     cepFornecedor,
                                     isEditing,
                                     currentId,
                                     setLoading,
                                     setNomeFornecedor,
                                     setCepFornecedor,
                                     setIsEditing,
                                     setCurrentId,
                                     getFornecedores,
                                 }) => {
    if (!nomeFornecedor || !cepFornecedor) {
        alert('Preencha todos os campos.');
        return;
    }

    setLoading(true);

    try {
        if (isEditing && currentId) {
            const fornecedorDoc = doc(db, 'fornecedores', currentId);
            await updateDoc(fornecedorDoc, {
                nome: nomeFornecedor,
                cep: cepFornecedor,
            });
            alert('Fornecedor atualizado com sucesso!');
        } else {
            const fornecedoresRef = collection(db, 'fornecedores');
            await addDoc(fornecedoresRef, {
                nome: nomeFornecedor,
                cep: cepFornecedor,
                createdAt: new Date(),
            });
            alert('Fornecedor cadastrado com sucesso!');
        }

        setNomeFornecedor('');
        setCepFornecedor('');
        setIsEditing(false);
        setCurrentId(null);
        getFornecedores();
    } catch (error) {
        console.error('Erro ao salvar fornecedor:', error);
        alert('Erro ao salvar fornecedor.');
    } finally {
        setLoading(false);
    }
};
