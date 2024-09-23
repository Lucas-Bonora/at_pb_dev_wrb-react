'use client';

import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebase';

export const getProdutos = async (setListaProdutos) => {
    try {
        const produtosRef = collection(db, "produtos");
        const data = await getDocs(produtosRef);
        setListaProdutos(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
    }
};
