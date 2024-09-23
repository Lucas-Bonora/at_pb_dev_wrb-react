'use client';

import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import {getRequisicoes} from "@/services/requisicao/getRequisicoes";

export const handleRemoveRequisicao = async (id, setListaRequisicao, user) => {
    const confirm = window.confirm("Deseja realmente remover esta requisição?");
    if (!confirm) return;

    try {
        const contatoDoc = doc(db, "requisicao", id);
        await deleteDoc(contatoDoc);
        alert("Requisição removida com sucesso!");
        await getRequisicoes(user, setListaRequisicao);
    } catch (error) {
        console.error("Erro ao remover requisição:", error);
        alert("Erro ao remover requisição.");
    }
};
