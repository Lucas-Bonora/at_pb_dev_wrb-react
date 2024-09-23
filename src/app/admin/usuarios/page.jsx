'use client'

import {useEffect, useState} from "react";
import {collection, getDocs} from "firebase/firestore";
import {auth, db} from "@/config/firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {useRouter} from "next/navigation";
import {getUsuarios} from "@/services/usuarios/getUsuarios";

const UsuariosPage = () => {
    const [listaUsuarios, setListaUsuarios] = useState([]);
    const usuariosRef = collection(db, "usuarios")


    const [user] = useAuthState(auth);
    const router = useRouter()
    const userSession = sessionStorage.getItem('user');


    if (!user && !userSession){
        router.push('/sign-up')
    }



    useEffect(() => {
        getUsuarios(usuariosRef, setListaUsuarios)
    }, []);

    return (
        <div className="bg-bronzeBg min-h-screen text-bronzePrimaryText p-14
        flex flex-col justify-center items-center">
            <h1 className="text-3xl">
                Lista usuários
            </h1>
            <div className="w-2/3 border border-bronzeBorder
            grid grid-cols-1 gap-7 p-7
            shadow-lg shadow-bronzeBorder/50">
                {listaUsuarios.map((usuario) => (
                    <div key={usuario.id}
                         className="flex flex-row justify-around">
                        <label>
                            Nome: {usuario.nome}
                        </label>
                        <label>
                            Email: {usuario.email}
                        </label>
                        <label>
                            Papel: {usuario.role}
                        </label>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default UsuariosPage;