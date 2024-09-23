'use client';

import { getDocs, collection } from 'firebase/firestore';
import { db } from '@/config/firebase';

export const getFornecedores = async (setListaFornecedores) => {
    try {
        const fornecedoresRef = collection(db, "fornecedores");
        const data = await getDocs(fornecedoresRef);
        setListaFornecedores(data.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
        console.error("Erro ao buscar fornecedores:", error);
    }
};
