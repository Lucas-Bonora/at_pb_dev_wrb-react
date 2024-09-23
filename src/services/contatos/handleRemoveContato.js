import {deleteDoc, doc} from "firebase/firestore";
import {db} from "@/config/firebase";
import {getContatos} from "@/services/contatos/getContatos";

export const handleRemoveContato = async (
    id,
    setListaContatos,
) => {
    const confirm = window.confirm("Deseja realmente remover este contato?");
    if (!confirm) return;

    try {
        const contatoDoc = doc(db, "contatos", id);
        await deleteDoc(contatoDoc);
        alert("Contato removido com sucesso!");
        await getContatos(setListaContatos);
    } catch (error) {
        console.error("Erro ao remover contato:", error);
        alert("Erro ao remover contato.");
    }
};