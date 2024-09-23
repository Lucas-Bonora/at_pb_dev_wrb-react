// src/components/SignUp.js
'use client';

import { useState, useEffect } from 'react';
import {useHandleSignUp} from "@/services/auth/handleSignUp";
import Link from "next/link";

const SignUp = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { handleSignUp, error } = useHandleSignUp();

    useEffect(() => {
        if (error) {
            console.error('Firebase Auth Error:', error);
        }
    }, [error]);

    return (
        <div className={`min-h-screen flex items-center justify-center bg-bronzeBg`}>
            <div className={'p-10 rounded-lg shadow-xl w-96 bg-bronzeComponent shadow-bronzeComponent/50'}>
                <h1 className={`text-2xl mb-5 text-bronzePrimaryText`}>Cadastro</h1>
                <input
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className={`w-full p-3 mb-4 rounded outline-none bg-bronzeBg text-bronzePrimaryText placeholder-bronzeSecondaryText`}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full p-3 mb-4 rounded outline-none bg-bronzeBg text-bronzePrimaryText placeholder-bronzeSecondaryText`}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full p-3 mb-4 rounded outline-none bg-bronzeBg text-bronzePrimaryText placeholder-bronzeSecondaryText`}
                />
                <button
                    onClick={() => handleSignUp(nome, email, password, setNome, setEmail, setPassword, setLoading)}
                    className={`w-full p-3 rounded text-bronzePrimaryText bg-bronzeButtons border-2 border-bronzeBorder`}
                    disabled={loading}
                >
                    {loading ? 'Cadastrando...' : 'Cadastrar'}
                </button>

                <div className="flex flex-row mt-4 text-bronzePrimaryText">
                    <p>Já tem conta?</p>
                    <Link className="ml-2 underline" href={"/sign-in"}>
                        Clique aqui
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignUp;

