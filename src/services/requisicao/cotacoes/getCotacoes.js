import {getDocs} from "firebase/firestore";
import {updateRequisicaoStatus} from "@/services/requisicao/updateRequisicaoStatus";

export const getCotacoes = async (
    cotacoesRef,
    setListaCotacoes,
    requisicao,
    id,
    setRequisicao,
) => {
    const data = await getDocs(cotacoesRef);
    const cotacoes = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    const cotacoesOrdenadas = cotacoes.sort((a, b) => a.createdAt.toDate() - b.createdAt.toDate());

    setListaCotacoes(cotacoesOrdenadas);
    await updateRequisicaoStatus(cotacoes.length, requisicao, id, setRequisicao);
};