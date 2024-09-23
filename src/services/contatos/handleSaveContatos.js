"use client"

import {addDoc, doc, updateDoc} from "firebase/firestore";
import {db} from "@/config/firebase";
import {getContatos} from "@/services/contatos/getContatos";

export const handleSaveContatos = async ({
                                             nomeContato,
                                             email,
                                             telefone,
                                             fornecedorId,
                                             setLoading,
                                             isEditing,
                                             currentId,
                                             contatosRef,
                                             setNomeContato,
                                             setEmail,
                                             setTelefone,
                                             setFornecedorId,
                                             setIsEditing,
                                             setCurrentId,
                                             setListaContatos,

                                         }) => {
    if (!nomeContato|| !email|| !telefone|| !fornecedorId) {
        alert("Preencha todos os campos.");
        return;}

    setLoading(true)

    try {
        if (isEditing && currentId) {
            const contatosDoc = doc(db, "contatos", currentId);
            await updateDoc(contatosDoc, {
                nome: nomeContato,
                email: email,
                telefone: telefone,
                fornecedorId: fornecedorId,
            });
            alert("Contato atualizado com sucesso!");
        } else {
            await addDoc(contatosRef, {
                nome: nomeContato,
                email: email,
                telefone: telefone,
                fornecedorId: fornecedorId,
                createdAt: new Date(),
            });
            alert("Contato cadastrado com sucesso!");
        }
        setNomeContato("");
        setEmail("");
        setTelefone("");
        setFornecedorId("");
        setIsEditing(false);
        setCurrentId(null);
        await getContatos(setListaContatos);
    } catch (error) {
        console.error("Erro ao salvar fornecedor:", error);
        alert("Erro ao salvar fornecedor.");
    } finally {
        setLoading(false);
    }

}