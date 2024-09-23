import {doc, getDoc} from "firebase/firestore";
import {db} from "@/config/firebase";
import {getProduto} from "@/services/produtos/getProduto";

export const getRequisicao = async (id, setRequisicao, setProduto) => {
    if(id) {
        const requisicaoRef = doc(db, "requisicao", id);
        const data = await getDoc(requisicaoRef);

        if (data.exists()) {
            setRequisicao(data.data());
            await  getProduto(data.data().produtoId, setProduto)
        } else {
            console.log("Requisção não existe.");
        }
    }
};
