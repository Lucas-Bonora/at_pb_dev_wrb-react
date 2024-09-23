'use client';
import { useEffect, useState } from "react";
import {addDoc, collection, doc, getDoc, getDocs, updateDoc} from "firebase/firestore";
import {auth, db} from "@/config/firebase";
import Link from "next/link";
import {useAuthState} from "react-firebase-hooks/auth";
import {useRouter} from "next/navigation";
import {getRequisicao} from "@/services/requisicao/getRequisicao";
import {getFornecedores} from "@/services/fornecedores/getFornecedores";
import {getContatos} from "@/services/contatos/getContatos";
import {handleSaveCotacao} from "@/services/requisicao/cotacoes/handleSaveCotacao";
import {getCotacoes} from "@/services/requisicao/cotacoes/getCotacoes";
import {getFornecedorNome} from "@/services/fornecedores/getFornecedorNome";
import {getContatoNome} from "@/services/contatos/getContatoNome";

const CotacaoPage = ({ params: { id } }) => {
    const [requisicao, setRequisicao] = useState(null);
    const [produto, setProduto] = useState(null);
    const [listaFornecedores, setListaFornecedores] = useState([]);
    const [listaContatos, setListaContatos] = useState([]);
    const [listaCotacoes, setListaCotacoes] = useState([]);
    const [visibilidadeForm, setVisibilidadeForm] = useState(false);
    const [formData, setFormData] = useState({
        preco: '',
        observacoes: '',
        fornecedorId: '',
        contatoId: '',
    });
    const [loading, setLoading] = useState(false);


    const cotacoesRef = collection(db, "requisicao", id, "cotacoes")

    const [user] = useAuthState(auth);
    const router = useRouter()
    const userSession = sessionStorage.getItem('user');



    if (!user && !userSession){
        router.push('/sign-up')
    }

    useEffect(() => {
        getRequisicao(id, setRequisicao, setProduto);
        getFornecedores(setListaFornecedores);
        getContatos(setListaContatos);
    }, [id]);

    const hanfleEscolhaFornecedor = (e) => {
        setFormData({ ...formData, fornecedorId: e.target.value, contatoId: '' });
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleShowForm = () => {
        setVisibilidadeForm(true);
    };

    const handleCloseForm = () => {
        setVisibilidadeForm(false);
        setFormData({
            preco: '',
            observacoes: '',
            fornecedorId: '',
            contatoId: '',
        });
    };

    useEffect(() => {
        getRequisicao();
        getFornecedores();
        getContatos();
        getCotacoes(
            cotacoesRef,
            setListaCotacoes,
            requisicao,
            id,
            setRequisicao,
        );
    }, [id]);

    return (
        <div className="bg-bronzeBg text-bronzePrimaryText min-h-screen w-screen p-14 relative">
            {requisicao ? (
                <div>
                    {produto ? (
                        <div>
                            <p className="border-b border-bronzeBorder px-2 text-2xl w-fit">
                                Requisição de: {produto.nome}
                            </p>
                            <p className="p-2 text-lg w-fit">
                                Aberta por: {requisicao.nomeUsuario}
                            </p>
                            <div className="flex flex-row mt-7">
                                <p className="p-2 text-lg w-fit mr-5">
                                    Quantidade: {requisicao.quantidade}
                                </p>
                                <div>
                                    <label>
                                        Descrição:
                                    </label>
                                    <p className="p-2 text-lg w-fit
                                border border-bronzeBorder">
                                        {requisicao.descricao}
                                    </p>
                                </div>

                            </div>
                            <p className="p-2 text-lg w-fit mt-4">
                                Status: {requisicao.status}
                            </p>

                        </div>
                    ) : (
                        <p>Carregando produto...</p>
                    )}

                    <button
                        onClick={handleShowForm}
                        className="bg-bronzeButtons border border-bronzePrimaryText rounded-md p-1.5 mt-7 mr-3"
                        disabled={requisicao?.status === "Fechada"}
                    >
                        Cotar
                    </button>

                    <Link href={`/admin`} className="border-b border-bronzePrimaryText pr-1.5 h-fit">
                        Voltar ao feed
                    </Link>

                    <div className="flex flex-row justify-around mt-14">
                        <div className="bg-bronzeComponent px-7 py-5 rounded border border-bronzeBorder grid grid-cols-2 gap-4 w-1/4">
                            <h2 className="text-xl col-start-1 col-end-3">
                                Fornecedores
                            </h2>
                            {listaFornecedores.map((fornecedor) => (
                                <div key={fornecedor.id} className="p-2.5 bg-bronzeBg h-fit border border-bronzeBorder rounded">
                                    <p>{fornecedor.nome}</p>

                                    <div className="mt-2">
                                        <h4 className="text-sm font-bold">Contatos:</h4>
                                        {listaContatos
                                            .filter((contato) => contato.fornecedorId === fornecedor.id)
                                            .map((contato) => (
                                                <p key={contato.id} className="text-xs">
                                                    {contato.nome} - {contato.telefone}
                                                </p>
                                            ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="w-2/3 bg-bronzeComponent
                        border border-bronzeBorder rounded
                        p-5 grid grid-cols-1 gap-4">
                            {listaCotacoes.map((cotacao, key) => (
                                <div key={key}
                                     className="bg-bronzeButtons border border-bronzePrimaryText rounded p-2.5">
                                    <h3 className="text-lg">
                                        {key + 1}° cotação
                                    </h3>

                                    <div className="grid grid-cols-2 gap-2 mt-2">
                                        <p>
                                            Valor: R$ {cotacao.preco}
                                        </p>

                                        <p>
                                            Fornecedor: {getFornecedorNome(cotacao.fornedorId, listaFornecedores)}
                                        </p>

                                        <p>
                                            Data de Criação: {cotacao.createdAt.toDate().toLocaleDateString("pt-BR")}
                                        </p>

                                        <p>
                                            Contato: {getContatoNome(cotacao.contatoId, listaContatos)}
                                        </p>

                                        <div className="col-start-1 col-end-3">
                                            <label className="text-sm mb-2">
                                                Observação:
                                            </label>
                                            <p className="p-2.5 col-start-1 col-end-3
                                        bg-bronzeBg
                                        border border-bronzePrimaryText rounded">
                                                {cotacao.observacoes}
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <p>Carregando...</p>
            )}

            {visibilidadeForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-bronzeBg bg-opacity-70 text-bronzePrimaryText">
                    <div className="bg-bronzeComponent bg-opacity-95 p-8 rounded shadow-lg shadow-bronzeComponent/80 w-1/2">
                        <h2 className="text-2xl mb-4">Nova Cotação</h2>
                        <form>
                            <div className="mb-4">
                                <label className="block mb-2">Preço</label>
                                <input
                                    type="text"
                                    name="preco"
                                    value={formData.preco}
                                    onChange={handleInputChange}
                                    className="w-full bg-bronzeBg border border-bronzeBorder p-2 rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">Observações</label>
                                <textarea
                                    name="observacoes"
                                    value={formData.observacoes}
                                    onChange={handleInputChange}
                                    className="w-full bg-bronzeBg border border-bronzeBorder p-2 rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">Fornecedor</label>
                                <select
                                    name="fornecedorId"
                                    value={formData.fornecedorId}
                                    onChange={hanfleEscolhaFornecedor}
                                    className="w-full bg-bronzeBg border border-bronzeBorder p-2 rounded"
                                >
                                    <option value="">Selecione um fornecedor</option>
                                    {listaFornecedores.map((fornecedor) => (
                                        <option key={fornecedor.id} value={fornecedor.id}>
                                            {fornecedor.nome}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">Contato</label>
                                <select
                                    name="contatoId"
                                    value={formData.contatoId}
                                    onChange={handleInputChange}
                                    className="w-full bg-bronzeBg border border-bronzeBorder p-2 rounded"
                                >
                                    <option value="">Selecione um contato</option>
                                    {listaContatos
                                        .filter((contato) => contato.fornecedorId === formData.fornecedorId)
                                        .map((contato) => (
                                            <option key={contato.id} value={contato.id}>
                                                {contato.nome}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={handleCloseForm}
                                    className="bg-red-800 h-fit border border-red-200 p-2 rounded-md mr-2 text-lg"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleSaveCotacao(
                                        setFormData,
                                        requisicao,
                                        setLoading,
                                        handleCloseForm,
                                        cotacoesRef,
                                        formData,
                                        setListaCotacoes,
                                        id,
                                        setRequisicao
                                    )}
                                    className="bg-bronzeButtons h-fit border border-bronzePrimaryText p-2 rounded-md text-lg"
                                >
                                    {loading ? "Salvando..." : "Salvar"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CotacaoPage

