import {deleteDoc, doc} from "firebase/firestore";
import {db} from "@/config/firebase";
import {getProdutos} from "@/services/produtos/getProdutos";

export const handleRemoveProduto = async (
    id,
    setListaProdutos,

) => {
    const confirm = window.confirm("Deseja realmente remover este produto?");
    if (!confirm) return;

    try {
        const produtoDoc = doc(db, "produtos", id);
        await deleteDoc(produtoDoc);
        alert("Produto removido com sucesso!");
        await getProdutos(setListaProdutos);
    } catch (error) {
        console.error("Erro ao remover produto:", error);
        alert("Erro ao remover produto.");
    }
};