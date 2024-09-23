'use client';

import { addDoc, doc, updateDoc, collection } from 'firebase/firestore';
import { db } from '@/config/firebase';
import {getRequisicao} from "@/services/requisicao/getRequisicao";
import {getRequisicoes} from "@/services/requisicao/getRequisicoes";
import {getUsuario} from "@/services/usuarios/getUsuario";

export const handleSaveRequisicao = async (
    produtoId,
    quantidade,
    descricao,
    isEditing,
    currentId,
    setProdutoId,
    setQuantidade,
    setDescricao,
    setIsEditing,
    setCurrentId,
    setLoading,
    usuario,
    setListaRequisicao,
    user
) => {
    if (!produtoId || !quantidade || !descricao) {
        alert("Preencha todos os campos.");
        return;
    }

    setLoading(true);


    const nomeUsuario = usuario.nome;


    try {
        const requisicaoRef = collection(db, "requisicao");
        if (isEditing && currentId) {
            const requisicaoDoc = doc(db, "requisicao", currentId);
            await updateDoc(requisicaoDoc, {
                produtoId: produtoId,
                quantidade: quantidade,
                descricao: descricao,
                status: "Aberta",
                nomeUsuario: nomeUsuario,
            });
            alert("Requisição atualizada com sucesso!");
        } else {
            await addDoc(requisicaoRef, {
                produtoId: produtoId,
                quantidade: quantidade,
                descricao: descricao,
                status: "Aberta",
                createdAt: new Date(),
                nomeUsuario: nomeUsuario,
            });
            alert("Requisição cadastrada com sucesso!");
        }

        setProdutoId("");
        setQuantidade(0);
        setDescricao("");
        setIsEditing(false);
        setCurrentId(null);
        await getRequisicoes(user, setListaRequisicao);
    } catch (error) {
        console.error("Erro ao salvar requisição:", error);
        alert("Erro ao salvar requisição.");
    } finally {
        setLoading(false);
    }
};
