'use client';

import { auth, db } from '@/config/firebase';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

export const useHandleSignUp = () => {
    const [createUserWithEmailAndPassword, , error] = useCreateUserWithEmailAndPassword(auth);
    const router = useRouter();

    const handleSignUp = async (nome, email, password, setNome, setEmail, setPassword, setLoading) => {
        try {
            setLoading(true);
            const userCredential = await createUserWithEmailAndPassword(email, password);

            if (userCredential && userCredential.user) {
                const user = userCredential.user;

                await setDoc(doc(db, 'usuarios', user.uid), {
                    nome: nome,
                    email: user.email,
                    role: 'Colaborador',
                    createdAt: new Date(),
                });

                sessionStorage.setItem('user', 'true');
                setNome('');
                setEmail('');
                setPassword('');
                router.push('/colaborador');
            } else {
                console.error('Falha ao criar usuário: userCredential ou user é undefined');
            }
        } catch (e) {
            console.error('Erro ao registrar e criar documento:', e);
        } finally {
            setLoading(false);
        }
    };

    return { handleSignUp, error };
};