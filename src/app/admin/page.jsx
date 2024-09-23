// src/components/AdminPage.js
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/config/firebase';
import {getRequisicoes} from "@/services/requisicao/getRequisicoes";
import {getProdutos} from "@/services/produtos/getProdutos";
import {getProdutoNome} from "@/services/produtos/getProdutoNome";
import {getUsuario} from "@/services/usuarios/getUsuario";


const AdminPage = () => {
    const [requiscaoList, setRequiscaoList] = useState(null);
    const [listaProdutos, setListaProdutos] = useState([]);
    const [user] = useAuthState(auth);
    const router = useRouter();
    const userSession = sessionStorage.getItem('user');
    const [usuario, setUsuario] = useState(null);
    const [listaRequisicao, setListaRequisicao] = useState([]);



    if (!user && !userSession) {
        router.push('/sign-up');
    }

    useEffect(() => {
        getProdutos(setListaProdutos);
        if (user) {
            getUsuario(user, setUsuario);
            getRequisicoes(user, setListaRequisicao)
        }
    }, [user]);

    return (
        <main
            className="min-h-screen w-screen bg-bronzeBg text-bronzePrimaryText flex flex-col p-14"
        >
            <h1 className="text-center text-3xl font-bold mb-7">Tela Administrador</h1>

            <div
                className="flex flex-row justify-start my-7 mx-14 gap-7 w-fit bg-bronzeComponent rounded-md px-3.5 py-2"
            >
                <Link href={`/admin/fornecedores`} className="p-2 rounded hover:bg-bronzeButtons">
                    Fornecedores
                </Link>

                <Link href={`/admin/contatos`} className="p-2 rounded hover:bg-bronzeButtons">
                    Contatos
                </Link>

                <Link href={`/admin/produtos`} className="p-2 rounded hover:bg-bronzeButtons">
                    Produtos
                </Link>

                <Link href={`/admin/usuarios`} className="p-2 rounded hover:bg-bronzeBg">
                    Usuarios
                </Link>

                <button
                    onClick={() => {
                        signOut(auth);
                        sessionStorage.removeItem('user');
                    }}
                    className="p-2 rounded hover:bg-red-800"
                >
                    Log out
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-7 px-14">
                {listaRequisicao?.map((requisicao, key) => (
                    <div
                        key={key}
                        className="bg-bronzeComponent border border-bronzeBorder p-3.5 shadow-lg shadow-bronzeBorder/80 flex flex-row justify-between items-center"
                    >
                        <div className="flex flex-col">
                            <p className="border-b border-bronzePrimaryText pr-1.5 h-fit">
                                Produto: {getProdutoNome(requisicao.produtoId, listaProdutos)}
                            </p>
                            <div className="mt-2 flex flex-row w-full justify-around">
                                <p className="text-sm">Nome: {requisicao.nomeUsuario}</p>
                                <p className="text-sm">Status: {requisicao.status}</p>
                            </div>
                        </div>

                        <Link
                            href={`/admin/${requisicao.id}`}
                            className="bg-bronzeButtons border border-bronzePrimaryText p-1.5 rounded-md text-base my-3.5"
                        >
                            Cotar
                        </Link>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default AdminPage;
