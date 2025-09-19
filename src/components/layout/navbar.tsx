'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { siteConfig } from '@/config/site';

export function Navbar() {
    // Usar un manejo seguro de la sesión
    const { data: session, status } = useSession();
    const isAuthenticated = status === 'authenticated';
    const isLoading = status === 'loading';

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeLink, setActiveLink] = useState('/');

    // Detectar scroll para cambiar el estilo de la navbar
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        // Detectar la ruta actual
        setActiveLink(window.location.pathname);

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const navLinks = [
        { href: '/courses', label: 'Cursos' },
        { href: '/membership', label: 'Membresía' },
        { href: '/analysis-template-generator', label: 'Generador' },
        { href: '/blog', label: 'Blog' },
        { href: '/contact', label: 'Contacto' }
    ];

    return (
        <header
            className={`sticky top-0 z-40 w-full backdrop-blur-md transition-all duration-300 ${isScrolled
                    ? 'bg-white/90 shadow-md py-3'
                    : 'bg-white/80 border-b border-gray-200 py-4'
                }`}
        >
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                {/* Logo y Nombre del Sitio */}
                <Link href="/" className="mr-6 flex items-center space-x-3 group" aria-label="Inicio">
                    <div className="relative overflow-hidden rounded-full">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <img
                            src="/images/Logo.svg"
                            alt={siteConfig.name}
                            className="h-10 w-10 rounded-full relative z-10 transition-transform duration-300 group-hover:scale-110"
                        />
                    </div>
                    <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                        {siteConfig.name}
                    </span>
                </Link>

                {/* Enlaces de Navegación - Escritorio */}
                <nav className="hidden md:flex items-center space-x-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeLink === link.href
                                    ? 'text-indigo-700 bg-indigo-50'
                                    : 'text-gray-700 hover:text-indigo-700 hover:bg-indigo-50/50'
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}

                    {isLoading ? (
                        <div className="ml-2 px-4 py-2 bg-gray-100 text-gray-400 rounded-md text-sm font-medium">
                            Cargando...
                        </div>
                    ) : isAuthenticated ? (
                        <div className="flex items-center space-x-2">
                            <Link
                                href="/dashboard"
                                className="px-4 py-2 rounded-md text-sm font-medium text-indigo-700 hover:bg-indigo-50/50 transition-all"
                            >
                                Mi Perfil
                            </Link>
                            <button
                                onClick={() => signOut({ callbackUrl: '/' })}
                                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md text-sm font-medium hover:shadow-md transition-all hover:scale-105"
                            >
                                Cerrar Sesión
                            </button>
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="ml-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md text-sm font-medium hover:shadow-md transition-all hover:scale-105"
                        >
                            Iniciar Sesión
                        </Link>
                    )}
                </nav>

                {/* Botón de menú móvil */}
                <button
                    className="md:hidden flex items-center"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Abrir menú"
                >
                    <svg
                        className={`w-6 h-6 text-gray-700 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        {isMobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Menú móvil */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-200">
                    <div className="container mx-auto px-4 py-3">
                        <nav className="flex flex-col space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`px-4 py-2 rounded-md text-sm font-medium ${activeLink === link.href
                                            ? 'text-indigo-700 bg-indigo-50'
                                            : 'text-gray-700 hover:text-indigo-700 hover:bg-indigo-50/50'
                                        }`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}

                            {isLoading ? (
                                <div className="px-4 py-2 bg-gray-100 text-gray-400 rounded-md text-sm font-medium text-center">
                                    Cargando...
                                </div>
                            ) : isAuthenticated ? (
                                <>
                                    <Link
                                        href="/dashboard"
                                        className="px-4 py-2 rounded-md text-sm font-medium text-indigo-700 bg-indigo-50"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Mi Perfil
                                    </Link>
                                    <button
                                        onClick={() => {
                                            setIsMobileMenuOpen(false);
                                            signOut({ callbackUrl: '/' });
                                        }}
                                        className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md text-sm font-medium hover:opacity-90 text-center"
                                    >
                                        Cerrar Sesión
                                    </button>
                                </>
                            ) : (
                                <Link
                                    href="/login"
                                    className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md text-sm font-medium hover:opacity-90 text-center"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Iniciar Sesión
                                </Link>
                            )}
                        </nav>
                    </div>
                </div>
            )}
        </header>
    );
}