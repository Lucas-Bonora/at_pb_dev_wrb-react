'use client';

import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/config/firebase';

export const getRequisicoes = async (user, setListaRequisicao) => {
    if (user) {
        try {
            const requisicaoRef = collection(db, "requisicao");
            const data = await getDocs(requisicaoRef);

            setListaRequisicao(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        } catch (error) {
            console.error("Erro ao buscar requisições:", error);
        }
    } else {
        console.log("Usuário não logado.");
    }
};
