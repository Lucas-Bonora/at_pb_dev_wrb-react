import {doc, updateDoc} from "firebase/firestore";
import {db} from "@/config/firebase";

export const updateRequisicaoStatus = async (cotacoesCount, requisicao, id, setRequisicao) => {
    let status;
    if (cotacoesCount === 0) {
        status = "Aberta";
    } else if (cotacoesCount === 1 || cotacoesCount === 2) {
        status = "Em cotação";
    } else if (cotacoesCount >= 3) {
        status = "Fechada";
    }

    if (requisicao?.status !== status) {
        const requisicaoRef = doc(db, "requisicao", id);
        await updateDoc(requisicaoRef, { status });
        setRequisicao((prev) => ({ ...prev, status }));
    }
};