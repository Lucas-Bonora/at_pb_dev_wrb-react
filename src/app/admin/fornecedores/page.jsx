'use client'

import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/config/firebase';
import {getFornecedores} from "@/services/fornecedores/getFornecedores";
import {handleSaveFornecedores} from "@/services/fornecedores/handleSaveFornecedores";
import {handleEditFornecedor} from "@/services/fornecedores/handleEditFornecedor";
import {handleRemoveFornecedor} from "@/services/fornecedores/handleRemoveFornecedor";

const Fornecedores = () => {
    const [nomeFornecedor, setNomeFornecedor] = useState('');
    const [cepFornecedor, setCepFornecedor] = useState('');
    const [listaFornecedores, setListaFornecedores] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    const [user] = useAuthState(auth);
    const router = useRouter();
    const userSession = sessionStorage.getItem('user');

    if (!user && !userSession) {
        router.push('/sign-up');
    }

    useEffect(() => {
        getFornecedores(setListaFornecedores);
    }, []);

    return (
        <div className="min-h-screen w-screen bg-bronzeBg p-14 text-bronzePrimaryText">
            <h1 className="text-3xl">Menu de fornecedores</h1>

            <div className="flex flex-row justify-start w-full my-14">
                <div className="bg-bronzeComponent rounded border border-bronzeBorder w-1/3 h-fit mr-28 p-7">
                    <h3 className="text-xl">{isEditing ? 'Editar Fornecedor' : 'Cadastro novo Fornecedor'}</h3>
                    <input
                        type="text"
                        placeholder="Nome Fornecedor"
                        value={nomeFornecedor}
                        onChange={(e) => setNomeFornecedor(e.target.value)}
                        className="w-full p-3 mt-3 rounded outline-none bg-bronzeBg text-bronzePrimaryText placeholder-bronzeSecondaryText"
                    />

                    <input
                        type="text"
                        placeholder="Cep Fornecedor"
                        value={cepFornecedor}
                        onChange={(e) => setCepFornecedor(e.target.value)}
                        className="w-full p-3 mt-5 rounded outline-none bg-bronzeBg text-bronzePrimaryText placeholder-bronzeSecondaryText"
                    />

                    <button
                        onClick={() =>
                            handleSaveFornecedores({
                                nomeFornecedor,
                                cepFornecedor,
                                isEditing,
                                currentId,
                                setLoading,
                                setNomeFornecedor,
                                setCepFornecedor,
                                setIsEditing,
                                setCurrentId,
                                getFornecedores: () => getFornecedores(setListaFornecedores),
                            })
                        }
                        disabled={loading}
                        className="bg-bronzeButtons border-bronzePrimaryText rounded w-fit p-2 mt-5"
                    >
                        {loading ? 'Salvando...' : isEditing ? 'Atualizar' : 'Salvar'}
                    </button>
                </div>

                <div className="bg-bronzeComponent px-7 py-5 rounded border border-bronzeBorder grid grid-cols-3 gap-4">
                    {listaFornecedores.map((fornecedor) => (
                        <div key={fornecedor.id} className="p-2.5 bg-bronzeBg h-fit border border-bronzeBorder rounded">
                            <p>{fornecedor.nome}</p>
                            <p className="text-sm">Cep: {fornecedor.cep}</p>
                            <div className="flex flex-row mt-2.5">
                                <button
                                    onClick={() => handleEditFornecedor(fornecedor, setNomeFornecedor, setCepFornecedor, setIsEditing, setCurrentId)}
                                    className="bg-bronzeBg border border-bronzeSecondaryText p-1.5 rounded-md text-sm mr-2"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleRemoveFornecedor(fornecedor.id, () => getFornecedores(setListaFornecedores))}
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
    );
};

export default Fornecedores;
