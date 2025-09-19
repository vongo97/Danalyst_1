'use client';

import { useState } from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setMessage('');

        try {
            const response = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setMessage('Si el correo electrónico está registrado, recibirás un enlace para restablecer tu contraseña.');
            } else {
                const data = await response.json();
                setError(data.error || 'Ocurrió un error al procesar tu solicitud.');
            }
        } catch (error) {
            setError('Ocurrió un error al procesar tu solicitud. Por favor, intenta de nuevo.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <div className="flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                <div className="w-full max-w-sm mx-auto lg:w-96">
                    <div>
                        <Link href="/" className="flex items-center mb-8">
                            <img src="/images/Logo.svg" alt={siteConfig.name} className="w-10 h-10 mr-3" />
                            <span className="text-2xl font-bold text-indigo-600">{siteConfig.name}</span>
                        </Link>
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Recuperar contraseña</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
                        </p>

                        {message && (
                            <div className="p-3 mt-4 text-sm text-green-700 bg-green-100 rounded-md">
                                {message}
                            </div>
                        )}

                        {error && (
                            <div className="p-3 mt-4 text-sm text-red-700 bg-red-100 rounded-md">
                                {error}
                            </div>
                        )}
                    </div>

                    <div className="mt-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Correo electrónico
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="tu@email.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                                >
                                    {isLoading ? 'Enviando...' : 'Enviar enlace de recuperación'}
                                </button>
                            </div>

                            <div className="text-center">
                                <Link href="/login" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                    ← Volver al inicio de sesión
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="relative flex-1 hidden w-0 lg:block">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-700">
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-white">
                        <h2 className="mb-6 text-4xl font-bold">Recupera tu acceso</h2>
                        <p className="max-w-md mb-8 text-xl text-center text-indigo-100">
                            No te preocupes, es normal olvidar las contraseñas. Te ayudaremos a recuperar el acceso a tu cuenta.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
