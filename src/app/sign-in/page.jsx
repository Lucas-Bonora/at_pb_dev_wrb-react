'use client';

import { useState } from 'react';
import {useHandleSignIn} from "@/services/auth/handleSignIn";
import Link from "next/link";

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { handleSignIn, loading, error } = useHandleSignIn();

    return (
        <div className="min-h-screen flex items-center justify-center bg-bronzeBg">
            <div className="p-10 rounded-lg shadow-xl w-96 bg-bronzeComponent shadow-bronzeComponent/50">
                <h1 className="text-2xl mb-5 text-bronzePrimaryText">Entrar</h1>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 mb-4 rounded outline-none bg-bronzeBg text-bronzePrimaryText placeholder-bronzeSecondaryText"
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 mb-4 rounded outline-none bg-bronzeBg text-bronzePrimaryText placeholder-bronzeSecondaryText"
                />
                <button
                    onClick={() => handleSignIn(email, password, setEmail, setPassword)}
                    className="w-full p-3 rounded text-bronzePrimaryText bg-bronzeButtons border-2 border-bronzeBorder"
                    disabled={loading}
                >
                    {loading ? 'Entrando...' : 'Entrar'}
                </button>

                <div className="flex flex-row mt-4 text-bronzePrimaryText">
                    <p>Não tem conta?</p>
                    <Link className="ml-2 underline" href={"/sign-up"}>
                        Clique aqui
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
