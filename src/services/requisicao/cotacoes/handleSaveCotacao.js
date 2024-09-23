import {addDoc} from "firebase/firestore";
import {getCotacoes} from "@/services/requisicao/cotacoes/getCotacoes";

export const handleSaveCotacao = async (
    setFormData,
    requisicao,
    setLoading,
    handleCloseForm,
    cotacoesRef,
    formData,
    setListaCotacoes,
    id,
    setRequisicao
) => {
    if (!setFormData) {
        alert("Preencha todos os campos.");
        return;
    }

    if (requisicao?.status === "Fechada") {
        alert("Não é possível fazer cotações para uma requisição fechada.");
        return;
    }

    setLoading(true)
    handleCloseForm();

    try {
        await addDoc(cotacoesRef, {
            preco: formData.preco,
            observacoes: formData.observacoes,
            fornedorId: formData.fornecedorId,
            contatoId: formData.contatoId,
            createdAt: new Date(),
        }) ;
        alert("Cotação cadastrada com sucesso!");


        setFormData({
            preco: '',
            observacoes: '',
            fornecedorId: '',
            contatoId: '',
        });
        await getCotacoes( cotacoesRef,
            setListaCotacoes,
            requisicao,
            id,
            setRequisicao,);
    } catch (error) {
        console.error("Erro ao salvar cotação:", error);
        alert("Erro ao salvar cotação .");
    } finally {
        setLoading(false);
    }
};
