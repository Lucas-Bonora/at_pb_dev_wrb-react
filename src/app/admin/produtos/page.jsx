"use client"

import {addDoc, collection, deleteDoc, doc, getDocs, updateDoc} from "firebase/firestore";
import {auth, db} from "@/config/firebase";
import {useEffect, useState} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {useRouter} from "next/navigation";
import {handleSaveProduto} from "@/services/produtos/constHandleSaveProduto";
import {getProdutos} from "@/services/produtos/getProdutos";
import {handleRemoveProduto} from "@/services/produtos/handlRemoveProduto";
import {handleEditProduto} from "@/services/produtos/handleEditProduto";

const Produtos = () => {
    const [nomeProduto, setNomeProduto] = useState("")
    const [descricaoProduto, setDescricaoProduto] = useState("")
    const [listaProdutos, setListaProdutos] = useState([])
    const [loading, setLoading] = useState(false)
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const produtosRef = collection(db, "produtos")

    const [user] = useAuthState(auth);
    const router = useRouter()
    const userSession = sessionStorage.getItem('user');


    if (!user && !userSession){
        router.push('/sign-up')
    }



    useEffect(() => {
        getProdutos(setListaProdutos);
    }, []);

    return (
        <div className="min-h-screen w-screen bg-bronzeBg p-14 text-bronzePrimaryText">
            <h1 className="text-3xl">Menu de produtos</h1>

            <div className="flex flex-row justify-start w-full my-14">
                <div className="bg-bronzeComponent rounded border border-bronzeBorder w-1/3 h-fit mr-28 p-7">
                    <h3 className="text-xl">{isEditing ? "Editar Produto" : "Cadastro novo Produto"}</h3>

                    <input
                        type="text"
                        placeholder="Nome Produto"
                        value={nomeProduto}
                        onChange={(e) => setNomeProduto(e.target.value)}
                        className="w-full p-3 mt-3 rounded outline-none bg-bronzeBg text-bronzePrimaryText placeholder-bronzeSecondaryText"
                    />

                    <input
                        type="text"
                        placeholder="Descrição Produto"
                        value={descricaoProduto}
                        onChange={(e) => setDescricaoProduto(e.target.value)}
                        className="w-full p-3 mt-5 rounded outline-none bg-bronzeBg text-bronzePrimaryText placeholder-bronzeSecondaryText"
                    />

                    <button
                        onClick={() => handleSaveProduto(
                            nomeProduto,
                            descricaoProduto,
                            setLoading,
                            isEditing,
                            currentId,
                            produtosRef,
                            setNomeProduto,
                            setDescricaoProduto,
                            setIsEditing,
                            setCurrentId,
                            setListaProdutos,
                        )}
                        disabled={loading}
                        className="bg-bronzeButtons border-bronzePrimaryText rounded w-fit p-2 mt-5"
                    >
                        {loading ? "Salvando..." : isEditing ? "Atualizar" : "Salvar"}
                    </button>

                </div>
                <div className="bg-bronzeComponent px-7 py-5 rounded border border-bronzeBorder grid grid-cols-1 gap-4
                w-2/3">
                    {listaProdutos.map((produto) => (
                        <div key={produto.id} className="p-2.5 bg-bronzeBg h-fit border border-bronzeBorder rounded">
                            <p className="mx-2.5 text-lg">{produto.nome}</p>
                            <p className="
                             mx-2.5 my-3.5 p-2
                             border border-bronzeSecondaryText bg-bronzeBg rounded
                             text-pretty"
                               style={{ wordWrap: 'break-word' }}>{produto.descricao}</p>
                            <div className="flex flex-row mt-2.5">
                                <button
                                    onClick={() => handleEditProduto(produto,
                                        setNomeProduto,
                                        setDescricaoProduto,
                                        setIsEditing,
                                        setCurrentId)}
                                    className="bg-bronzeBg border border-bronzeSecondaryText p-1.5 rounded-md text-sm mr-2"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleRemoveProduto(produto.id, setListaProdutos)}
                                    className="bg-red-800 border border-red-200 p-1.5 rounded-md text-sm"
                                >
                                    Remover
                                </button>
                            </div>
                        </div>
                    ))}
                </div>


            </div>
        </div>
    )

}

export default Produtos;