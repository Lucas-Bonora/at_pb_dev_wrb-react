// src/components/ColaboradorPage.js
'use client';

import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/config/firebase';
import {getProdutos} from "@/services/produtos/getProdutos";
import {getRequisicoes} from "@/services/requisicao/getRequisicoes";
import {handleSaveRequisicao} from "@/services/requisicao/handleSaveRequisicao";
import {getProdutoNome} from "@/services/produtos/getProdutoNome";
import {handleEditRequisicao} from "@/services/requisicao/handleEditRequisicao";
import {handleRemoveRequisicao} from "@/services/requisicao/handleRemoveRequisicao";
import {getUsuario} from "@/services/usuarios/getUsuario";


const ColaboradorPage = () => {
    const [listaProdutos, setListaProdutos] = useState([]);
    const [listaRequisicao, setListaRequisicao] = useState([]);
    const [produtoId, setProdutoId] = useState('');
    const [quantidade, setQuantidade] = useState(0);
    const [descricao, setDescricao] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [loadingPage, setLoadingPage] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [usuario, setUsuario] = useState(null);


    const [user, loading, error] = useAuthState(auth);
    const router = useRouter();
    const userSession = sessionStorage.getItem('user');

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

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (error) {
        return <p>Erro ao carregar usuário: {error.message}</p>;
    }




    return (
        <main className="min-h-screen w-screen bg-bronzeBg text-bronzePrimaryText flex flex-col p-14">
            <h1 className="text-center text-3xl font-bold mb-7">Tela colaborador</h1>

            <button
                onClick={() => {
                    signOut(auth);
                    sessionStorage.removeItem('user');
                }}
                className="p-2 rounded w-fit bg-red-800 border border-bronzeBg hover:border-red-200"
            >
                Log out
            </button>

            <div className="flex flex-row justify-start w-full my-14">
                <div className="bg-bronzeComponent rounded border border-bronzeBorder w-1/3 h-fit mr-28 p-7">
                    <h3 className="text-xl">{isEditing ? 'Editar Requisição' : 'Cadastro Requisição de Compra'}</h3>

                    <select
                        value={produtoId}
                        onChange={(e) => setProdutoId(e.target.value)}
                        className="w-full p-3 mt-5 rounded outline-none bg-bronzeBg text-bronzePrimaryText placeholder-bronzeSecondaryText"
                    >
                        <option value="">Selecione um Produto</option>
                        {listaProdutos.map((produto) => (
                            <option key={produto.id} value={produto.id}>
                                {produto.nome}
                            </option>
                        ))}
                    </select>

                    <input
                        type="number"
                        placeholder="Quantidade necessária"
                        value={quantidade}
                        onChange={(e) => setQuantidade(e.target.value)}
                        className="w-full p-3 mt-3 rounded outline-none bg-bronzeBg text-bronzePrimaryText placeholder-bronzeSecondaryText"
                    />

                    <input
                        type="text"
                        placeholder="Descrição da requisição"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        className="w-full p-3 mt-3 rounded outline-none bg-bronzeBg text-bronzePrimaryText placeholder-bronzeSecondaryText"
                    />

                    <button
                        onClick={() =>
                            handleSaveRequisicao(
                                produtoId,
                                quantidade,
                                descricao,
                                isEditing,
                                currentId,
                                setProdutoId,
                                setQuantidade,
                                setDescricao,
                                setIsEditing,
                                setCurrentId,
                                setLoadingPage,
                                usuario,
                                setListaRequisicao,
                                user
                            )
                        }
                        disabled={loading}
                        className="bg-bronzeButtons border-bronzePrimaryText rounded w-fit p-2 mt-5"
                    >
                        {loading ? 'Salvando...' : isEditing ? 'Atualizar' : 'Salvar'}
                    </button>
                </div>

                <div className="bg-bronzeComponent px-7 py-5 rounded border border-bronzeBorder grid grid-cols-1 gap-4 w-1/3">
                    {listaRequisicao.map((requisicao) => (
                        <div key={requisicao.id} className="p-2.5 bg-bronzeBg h-fit border border-bronzeBorder rounded">
                            <p className="text-lg">Nome: {requisicao.nomeUsuario}</p>

                            <p className="text-lg">Status: {requisicao.status}</p>

                            <p>Quantidade: {requisicao.quantidade}</p>

                            <p className="text-sm w-1/5 overflow-hidden">
                                Categoria: {getProdutoNome(requisicao.produtoId, listaProdutos)}
                            </p>

                            <p
                                className="mx-2.5 my-3.5 p-2 border border-bronzeSecondaryText bg-bronzeBg rounded text-pretty"
                                style={{ wordWrap: 'break-word' }}
                            >
                                {requisicao.descricao}
                            </p>
                            <div className="flex flex-row mt-2.5">
                                <button
                                    onClick={() =>
                                        handleEditRequisicao(
                                            requisicao,
                                            setProdutoId,
                                            setQuantidade,
                                            setDescricao,
                                            setIsEditing,
                                            setCurrentId
                                        )
                                    }
                                    className="bg-bronzeBg border border-bronzeSecondaryText p-1.5 rounded-md text-sm mr-2"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleRemoveRequisicao(requisicao.id, user, setListaRequisicao)}
                                    className="bg-red-800 border border-red-200 p-1.5 rounded-md text-sm"
                                >
                                    Remover
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default ColaboradorPage;
