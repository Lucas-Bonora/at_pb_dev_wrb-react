"use client";
import { useEffect, useState } from "react";
import {addDoc, collection, deleteDoc, doc, getDocs, updateDoc} from "firebase/firestore";
import {auth, db} from "@/config/firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {useRouter} from "next/navigation";
import {handleSaveContatos} from "@/services/contatos/handleSaveContatos";
import {getFornecedores} from "@/services/fornecedores/getFornecedores";
import {getContatos} from "@/services/contatos/getContatos";
import {getFornecedorNome} from "@/services/fornecedores/getFornecedorNome";
import {handleRemoveContato} from "@/services/contatos/handleRemoveContato";
import {handleEditContato} from "@/services/contatos/handleEditContato";

const Contatos = () => {
    const [nomeContato, setNomeContato] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [fornecedorId, setFornecedorId] = useState("");
    const [listaFornecedores, setListaFornecedores] = useState([]);
    const [listaContatos, setListaContatos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const contatosRef = collection(db, "contatos")

    const [user] = useAuthState(auth);
    const router = useRouter()
    const userSession = sessionStorage.getItem('user');


    if (!user && !userSession){
        router.push('/sign-up')
    }



    useEffect(() => {
        getContatos(setListaContatos);
        getFornecedores(setListaFornecedores);
    }, []);


    return (
        <div className="min-h-screen w-screen bg-bronzeBg p-14 text-bronzePrimaryText">
            <h1 className="text-3xl">Menu de contatos</h1>

            <div className="flex flex-row justify-start w-full my-14">
                <div className="bg-bronzeComponent rounded border border-bronzeBorder w-1/3 h-fit mr-28 p-7">
                    <h3 className="text-xl">{isEditing ? "Editar Contato" : "Cadastro novo Contato"}</h3>

                    <input
                        type="text"
                        placeholder="Nome Contato"
                        value={nomeContato}
                        onChange={(e) => setNomeContato(e.target.value)}
                        className="w-full p-3 mt-3 rounded outline-none bg-bronzeBg text-bronzePrimaryText placeholder-bronzeSecondaryText"
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 mt-5 rounded outline-none bg-bronzeBg text-bronzePrimaryText placeholder-bronzeSecondaryText"
                    />

                    <input
                        type="text"
                        placeholder="Telefone"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                        className="w-full p-3 mt-5 rounded outline-none bg-bronzeBg text-bronzePrimaryText placeholder-bronzeSecondaryText"
                    />

                    <select
                        value={fornecedorId}
                        onChange={(e) => setFornecedorId(e.target.value)}
                        className="w-full p-3 mt-5 rounded outline-none bg-bronzeBg text-bronzePrimaryText placeholder-bronzeSecondaryText"
                    >
                        <option value="">Selecione um Fornecedor</option>
                        {listaFornecedores.map((fornecedor) => (
                            <option key={fornecedor.id} value={fornecedor.id}>
                                {fornecedor.nome}
                            </option>
                        ))}
                    </select>

                    <button
                        onClick={() =>
                            handleSaveContatos(
                                {
                                    nomeContato,
                                    email,
                                    telefone,
                                    fornecedorId,
                                    setLoading,
                                    isEditing,
                                    currentId,
                                    contatosRef,
                                    setNomeContato,
                                    setEmail,
                                    setTelefone,
                                    setFornecedorId,
                                    setIsEditing,
                                    setCurrentId,
                                    setListaContatos

                                }
                        )}
                        disabled={loading}
                        className="bg-bronzeButtons border-bronzePrimaryText rounded w-fit p-2 mt-5"
                    >
                        {loading ? "Salvando..." : isEditing ? "Atualizar" : "Salvar"}
                    </button>
                </div>

                <div className="bg-bronzeComponent rounded border border-bronzeBorder grid grid-cols-1
                p-4  gap-3
                w-2/3 h-fit ">
                    <div className="flex flex-row justify-start p-2.5">
                        <p className="w-1/5">
                            Nome
                        </p>
                        <p className="w-1/5">
                            Email
                        </p>
                        <p className="w-1/5">
                            Telefone
                        </p>
                        <p className="w-1/5">
                            Fornecedor
                        </p>
                    </div>
                    {listaContatos.map((contato) => (
                        <div key={contato.id} className="p-2.5 bg-bronzeBg flex flex-row justify-start
                        border border-bronzeBorder rounded">
                            <p className="text-sm w-1/5 overflow-hidden">
                                {contato.nome}
                            </p>
                            <p className="text-sm w-1/5 overflow-hidden">
                                {contato.email}
                            </p>
                            <p className="text-sm w-1/5 overflow-hidden">
                                {contato.telefone}
                            </p>
                            <p className="text-sm w-1/5 overflow-hidden">
                                {getFornecedorNome(contato.fornecedorId, listaFornecedores)}
                            </p>
                            <div className="flex flex-row justify-end w-1/5">
                                <button
                                    onClick={() => handleEditContato(
                                        contato,
                                        setNomeContato,
                                        setEmail,
                                        setTelefone,
                                        setFornecedorId,
                                        setIsEditing,
                                        setCurrentId
                                    )}
                                    className="bg-bronzeBg h-fit border border-bronzeSecondaryText p-1.5 mr-1.5 rounded-md text-xs"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleRemoveContato(contato.id, setListaContatos)}
                                    className="bg-red-800 h-fit border border-red-200 p-1.5 rounded-md text-xs"
                                >
                                    Remover
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Contatos;