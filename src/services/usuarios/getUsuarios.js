import {getDocs} from "firebase/firestore";

export const getUsuarios = async (usuariosRef, setListaUsuarios) => {
    const data = await getDocs(usuariosRef);
    setListaUsuarios(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
};