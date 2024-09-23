'use client';

import { auth, db } from '@/config/firebase';
import { useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

export const useHandleSignIn = () => {
    const [signInWithEmailAndPassword, , loading, error] = useSignInWithEmailAndPassword(auth);
    const router = useRouter();

    const handleSignIn = async (email, password, setEmail, setPassword) => {
        try {
            const res = await signInWithEmailAndPassword(email, password);
            const loggedInUser = res.user;
            console.log({ res });

            if (loggedInUser) {
                const userDocRef = doc(db, 'usuarios', loggedInUser.uid);
                const userDocSnap = await getDoc(userDocRef);

                if (userDocSnap.exists()) {
                    const userData = userDocSnap.data();

                    if (userData.role === 'Colaborador') {
                        router.push('/colaborador');
                    } else if (userData.role === 'Admin') {
                        router.push('/admin');
                    } else {
                        alert('Papel de usuário desconhecido:');
                    }
                } else {
                    alert('Documento do usuário não encontrado no Firestore.');
                }

                sessionStorage.setItem('user', 'true');
            }

            setEmail('');
            setPassword('');
        } catch (e) {
            console.error('Erro ao fazer login:', e);
        }
    };

    return { handleSignIn, loading, error };
};