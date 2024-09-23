import {doc, getDoc} from "firebase/firestore";
import {db} from "@/config/firebase";

export const getProduto = async (produtoId, setProduto) => {
    if (produtoId) {
        const produtoRef = doc(db, "produtos", produtoId);
        const data = await getDoc(produtoRef);

        if (data.exists()) {
            setProduto(data.data());
        } else {
            console.log("Produto não encontrado!");
        }
    }
};