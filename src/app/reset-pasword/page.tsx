'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

function ResetPasswordForm() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isTokenValid, setIsTokenValid] = useState(false);
    const [isChecking, setIsChecking] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    useEffect(() => {
        if (!token) {
            setIsChecking(false);
            setError('Token inválido o expirado');
            return;
        }

        const verifyToken = async () => {
            try {
                const response = await fetch(`/api/auth/verify-reset-token?token=${token}`);
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || 'Token inválido');
                }

                setIsTokenValid(true);
            } catch (error) {
                setError('El enlace de recuperación es inválido o ha expirado');
            } finally {
                setIsChecking(false);
            }
        };

        verifyToken();
    }, [token]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Error al restablecer la contraseña');
            }

            setMessage('Contraseña restablecida con éxito. Redirigiendo...');

            // Redirigir al login después de 3 segundos
            setTimeout(() => {
                router.push('/login');
            }, 3000);

        } catch (error: any) {
            setError(error.message || 'Ocurrió un error. Por favor, intenta de nuevo.');
            setIsLoading(false);
        }
    };

    if (isChecking) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="p-8 text-center">
                    <div className="w-16 h-16 mx-auto border-4 border-t-indigo-600 border-gray-200 rounded-full animate-spin"></div>
                    <p className="mt-4 text-gray-600">Verificando enlace de recuperación...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            <div className="flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
                <div className="w-full max-w-sm mx-auto">
                    <div>
                        <Link href="/" className="flex items-center mb-8">
                            <img src="/images/Logo.svg" alt={siteConfig.name} className="w-10 h-10 mr-3" />
                            <span className="text-2xl font-bold text-indigo-600">{siteConfig.name}</span>
                        </Link>
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Restablece tu contraseña</h2>
                    </div>

                    <div className="mt-8">
                        {error && (
                            <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-md">
                                {error}
                            </div>
                        )}

                        {message && (
                            <div className="p-3 mb-4 text-sm text-green-700 bg-green-100 rounded-md">
                                {message}
                            </div>
                        )}

                        {isTokenValid ? (
                            <div className="mt-6">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                            Nueva contraseña
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                id="password"
                                                name="password"
                                                type="password"
                                                autoComplete="new-password"
                                                required
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                            Confirmar contraseña
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                type="password"
                                                autoComplete="new-password"
                                                required
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            {isLoading ? 'Procesando...' : 'Restablecer contraseña'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <div className="mt-6 text-center">
                                <p className="mb-4 text-gray-600">
                                    El enlace de recuperación es inválido o ha expirado.
                                </p>
                                <Link href="/forgot-password" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                    Solicitar un nuevo enlace
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="relative flex-1 hidden w-0 lg:block">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-700">
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-white">
                        <h2 className="mb-6 text-4xl font-bold">Restablece tu contraseña</h2>
                        <p className="max-w-md mb-8 text-xl text-center text-indigo-100">
                            Crea una nueva contraseña segura para proteger tu cuenta.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="p-8 text-center">
                    <div className="w-16 h-16 mx-auto border-4 border-t-indigo-600 border-gray-200 rounded-full animate-spin"></div>
                    <p className="mt-4 text-gray-600">Cargando...</p>
                </div>
            </div>
        }>
            <ResetPasswordForm />
        </Suspense>
    );
}
