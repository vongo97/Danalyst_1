'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAllBlogPostsFromDB, BlogPost } from './lib/posts';
import { siteConfig } from '@/config/site';

// Definimos los tipos de categorías disponibles
type Category = 'all' | 'python' | 'sql' | 'visualization' | 'data-analysis';

export default function BlogPage() {
    // Estado para almacenar todos los posts
    const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
    // Estado para almacenar los posts filtrados
    const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
    // Estado para la categoría seleccionada
    const [selectedCategory, setSelectedCategory] = useState<Category>('all');
    // Estado para el post destacado
    const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
    // Estado para indicar carga
    const [loading, setLoading] = useState(true);

    // Cargar los posts al montar el componente
    useEffect(() => {
        async function loadPosts() {
            try {
                const posts = await getAllBlogPostsFromDB();
                setAllPosts(posts);
                setFilteredPosts(posts);

                // Establecer el primer post como destacado
                if (posts.length > 0) {
                    setFeaturedPost(posts[0]);
                }
            } catch (error) {
                console.error('Error al cargar posts:', error);
            } finally {
                setLoading(false);
            }
        }

        loadPosts();
    }, []);

    // Función para determinar la categoría de un post basado en su slug
    const getPostCategory = (slug: string): Category => {
        if (slug.includes('pandas')) return 'python';
        if (slug.includes('sql')) return 'sql';
        if (slug.includes('matplotlib')) return 'visualization';
        return 'data-analysis';
    };

    // Función para filtrar los posts por categoría
    const filterPostsByCategory = (category: Category) => {
        setSelectedCategory(category);

        if (category === 'all') {
            setFilteredPosts(allPosts);
        } else {
            const filtered = allPosts.filter(post => {
                const postCategory = getPostCategory(post.slug);
                return postCategory === category;
            });
            setFilteredPosts(filtered);
        }
    };

    // Función para obtener el nombre y color de la categoría
    const getCategoryInfo = (slug: string) => {
        let category = 'Análisis de Datos';
        let categoryColor = 'bg-indigo-100 text-indigo-800';

        if (slug.includes('pandas')) {
            category = 'Python';
            categoryColor = 'bg-green-100 text-green-800';
        } else if (slug.includes('sql')) {
            category = 'SQL';
            categoryColor = 'bg-amber-100 text-amber-800';
        } else if (slug.includes('matplotlib')) {
            category = 'Visualización';
            categoryColor = 'bg-purple-100 text-purple-800';
        }

        return { category, categoryColor };
    };

    if (loading) {
        return (
            <div className="flex min-h-screen bg-gray-50 items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Cargando artículos...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* Hero Section con animación */}
            <section className="relative py-24 bg-gradient-to-r from-indigo-600 to-purple-700 text-white overflow-hidden">
                {/* Elementos decorativos */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10"></div>
                    <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full bg-purple-500/20"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Blog de{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-indigo-100">
                            {siteConfig.name}
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl max-w-3xl mx-auto text-indigo-100">
                        Artículos, tutoriales y reflexiones sobre el mundo del análisis de
                        datos.
                    </p>
                </div>
            </section>

            <main className="container mx-auto py-16 px-4 flex-grow">
                {/* Post destacado */}
                {featuredPost && (
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold mb-8 text-gray-800 flex items-center">
                            <span className="mr-2">✨</span> Artículo Destacado
                        </h2>

                        <article className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:shadow-xl">
                            <div className="md:flex">
                                {featuredPost.thumbnailUrl && (
                                    <div className="md:flex-shrink-0">
                                        <div className="h-64 md:h-full md:w-80 relative">
                                            <Image
                                                src={featuredPost.thumbnailUrl}
                                                alt={featuredPost.title}
                                                fill
                                                className="object-cover"
                                                priority
                                            />
                                        </div>
                                    </div>
                                )}
                                <div className="p-8 md:p-10">
                                    <div className="uppercase tracking-wide text-sm text-indigo-600 font-semibold mb-1">
                                        {getCategoryInfo(featuredPost.slug).category}
                                    </div>
                                    <Link href={`/blog/${featuredPost.slug}`} className="block">
                                        <h3 className="text-3xl font-bold text-gray-900 hover:text-indigo-600 transition-colors mb-3">
                                            {featuredPost.title}
                                        </h3>
                                    </Link>
                                    <p className="text-gray-600 text-lg mb-6">
                                        {featuredPost.summary}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm text-gray-500">
                                            {new Date(featuredPost.date).toLocaleDateString(
                                                "es-ES",
                                                {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                }
                                            )}
                                        </p>
                                        <Link
                                            href={`/blog/${featuredPost.slug}`}
                                            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors"
                                        >
                                            Leer artículo
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 ml-2"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5l7 7-7 7"
                                                />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                )}

                {/* Filtros de categoría */}
                <div className="mb-10">
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => filterPostsByCategory("all")}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === "all"
                                    ? "bg-indigo-600 text-white"
                                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                                }`}
                        >
                            Todos
                        </button>
                        <button
                            onClick={() => filterPostsByCategory("python")}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === "python"
                                    ? "bg-green-600 text-white"
                                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                                }`}
                        >
                            Python
                        </button>
                        <button
                            onClick={() => filterPostsByCategory("sql")}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === "sql"
                                    ? "bg-amber-600 text-white"
                                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                                }`}
                        >
                            SQL
                        </button>
                        <button
                            onClick={() => filterPostsByCategory("visualization")}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === "visualization"
                                    ? "bg-purple-600 text-white"
                                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                                }`}
                        >
                            Visualización
                        </button>
                    </div>
                </div>

                {/* Lista de posts con diseño mejorado */}
                <h2 className="text-3xl font-bold mb-8 text-gray-800">
                    {selectedCategory === "all"
                        ? "Todos los artículos"
                        : `Artículos de ${selectedCategory === "python"
                            ? "Python"
                            : selectedCategory === "sql"
                                ? "SQL"
                                : selectedCategory === "visualization"
                                    ? "Visualización"
                                    : "Análisis de Datos"
                        }`}
                </h2>

                {filteredPosts.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-600 text-lg">
                            No hay artículos disponibles en esta categoría.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPosts.map((post: BlogPost) => {
                            const { category, categoryColor } = getCategoryInfo(post.slug);

                            return (
                                <article
                                    key={post.slug}
                                    className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col transform transition-all hover:shadow-md"
                                >
                                    {post.thumbnailUrl && (
                                        <div className="relative h-48 w-full">
                                            <Image
                                                src={post.thumbnailUrl}
                                                alt={post.title}
                                                fill
                                                className="object-cover"
                                            />
                                            <div className="absolute top-4 left-4">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColor}`}
                                                >
                                                    {category}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                    <div className="p-6 flex-grow">
                                        <Link href={`/blog/${post.slug}`}>
                                            <h3 className="text-xl font-bold text-gray-900 hover:text-indigo-600 transition-colors mb-3">
                                                {post.title}
                                            </h3>
                                        </Link>
                                        <p className="text-gray-600 mb-4 line-clamp-2">
                                            {post.summary}
                                        </p>
                                    </div>
                                    <div className="px-6 pb-6 pt-2 border-t border-gray-100 flex justify-between items-center">
                                        <p className="text-sm text-gray-500">
                                            {new Date(post.date).toLocaleDateString("es-ES", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </p>
                                        <Link
                                            href={`/blog/${post.slug}`}
                                            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center"
                                        >
                                            Leer más
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 ml-1"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5l7 7-7 7"
                                                />
                                            </svg>
                                        </Link>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}

                {/* Sección de suscripción al blog */}
                <div className="mt-20 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl p-8 md:p-12">
                    <div className="md:flex items-center justify-between">
                        <div className="mb-6 md:mb-0 md:mr-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                ¿Quieres ver más contenido? Subscribete a nuestro blog.
                            </h3>
                            <p className="text-gray-700">
                                Suscríbete a nuestra membresía para enterarte de las ultimas
                                noticias y contenido exclusivo.
                            </p>
                        </div>
                        <div className="flex-shrink-0">
                            <Link
                                href="/membership"
                                className="inline-block px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                            >
                                Explorar Membresía
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}