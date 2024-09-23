import {collection, getDocs} from "firebase/firestore";
import {db} from "@/config/firebase";

export const getContatos = async (setListaContatos) => {
    try {
        const contatosRef = collection(db, "contatos");
        const data = await getDocs(contatosRef);
        setListaContatos(data.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
        console.error("Erro ao buscar contato:", error);
    }
};