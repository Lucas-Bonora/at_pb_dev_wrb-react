import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/config/firebase";

export const getUsuario = async (user, setUsuario) => {
    if (user) {
        try {
            const usuarioRef = doc(db, "usuarios", user.uid); // Refere-se ao documento com o UID
            const usuarioDoc = await getDoc(usuarioRef);

            if (usuarioDoc.exists()) {
                setUsuario(usuarioDoc.data());
            } else {
                console.log("Usuário não encontrado.");
            }
        } catch (error) {
            console.error("Erro ao buscar usuário:", error);
        }
    } else {
        console.log("Nenhum usuário logado.");
    }
};
