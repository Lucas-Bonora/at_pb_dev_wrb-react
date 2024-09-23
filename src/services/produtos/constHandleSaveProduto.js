import {addDoc, doc, updateDoc} from "firebase/firestore";
import {db} from "@/config/firebase";
import {getProdutos} from "@/services/produtos/getProdutos";

export  const handleSaveProduto = async (
    nomeProduto,
    descricaoProduto,
    setLoading,
    isEditing,
    currentId,
    produtosRef,
    setNomeProduto,
    setDescricaoProduto,
    setIsEditing,
    setCurrentId,
    setListaProdutos,

) => {
    if (!nomeProduto|| !descricaoProduto) {
        alert("Preencha todos os campos.");
        return;
    }

    setLoading(true)

    try {
        if (isEditing && currentId) {
            const produtosDoc = doc(db, "produtos", currentId);
            await updateDoc(produtosDoc, {
                nome: nomeProduto,
                descricao: descricaoProduto,
            });
            alert("Produto atualizado com sucesso!");
        } else {
            await addDoc(produtosRef, {
                nome: nomeProduto,
                descricao: descricaoProduto,
                createdAt: new Date(),
            });
            alert("Produto cadastrado com sucesso!");
        }
        setNomeProduto("");
        setDescricaoProduto("");
        setIsEditing(false);
        setCurrentId(null);
        await getProdutos(setListaProdutos);
    } catch (error) {
        console.error("Erro ao salvar produto:", error);
        alert("Erro ao salvar produto.");
    } finally {
        setLoading(false);
    }
}