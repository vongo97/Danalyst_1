import { Metadata } from 'next';
import { getBlogPostBySlugFromDB, getAllBlogSlugsFromDB } from '../lib/posts';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { remark } from 'remark';
import html from 'remark-html';

interface BlogPostPageProps {
    params: {
        slug: string;
    };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const post = await getBlogPostBySlugFromDB(params.slug);

    if (!post) {
        return {
            title: 'Entrada no encontrada',
            description: 'La entrada de blog solicitada no existe.',
        };
    }

    return {
        title: `${post.title} | Blog de ${siteConfig.name}`,
        description: post.summary,
        openGraph: {
            title: post.title,
            description: post.summary,
            type: 'article',
            publishedTime: post.date.toString(),
            images: post.thumbnailUrl ? [{ url: post.thumbnailUrl }] : undefined,
        },
    };
}

export async function generateStaticParams() {
    const slugs = await getAllBlogSlugsFromDB();
    return slugs.map(slug => ({
        slug: slug,
    }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const post = await getBlogPostBySlugFromDB(params.slug);

    if (!post) {
        notFound();
    }

    // Procesar el contenido Markdown a HTML
    const processedContent = await remark()
        .use(html)
        .process(post.content);
    const contentHtml = processedContent.toString();

    // Determinar la imagen de cabecera
    const headerImage = post.thumbnailUrl;

    // Obtener la fecha formateada
    const formattedDate = new Date(post.date).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Determinar categoría basada en el título o slug para mostrar un color temático
    let categoryColor = 'from-blue-500 to-indigo-600';
    if (post.slug.includes('pandas')) {
        categoryColor = 'from-green-500 to-emerald-600';
    } else if (post.slug.includes('sql')) {
        categoryColor = 'from-orange-500 to-amber-600';
    } else if (post.slug.includes('matplotlib') || post.slug.includes('visualizacion')) {
        categoryColor = 'from-purple-500 to-pink-600';
    }

    // Determinar la lectura estimada (aproximadamente 200 palabras por minuto)
    const wordCount = post.content.split(/\s+/).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* Hero Section con imagen de fondo y gradiente */}
            <section className={`relative py-24 bg-gradient-to-r ${categoryColor} text-white overflow-hidden`}>
                {/* Elementos decorativos */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white"></div>
                    <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-white"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="mb-6">
                            <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                                {post.slug.includes('pandas') ? 'Python' :
                                    post.slug.includes('sql') ? 'Bases de Datos' :
                                        post.slug.includes('matplotlib') ? 'Visualización de Datos' : 'Análisis de Datos'}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">{post.title}</h1>
                        <div className="flex items-center justify-center text-sm space-x-4 text-white/80">
                            <span>{formattedDate}</span>
                            <span>•</span>
                            <span>{readingTime} min de lectura</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contenido principal con diseño mejorado */}
            <main className="container mx-auto py-12 px-4 flex-grow">
                <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
                    {/* Imagen destacada si existe */}
                    {headerImage && (
                        <div className="relative h-80 w-full">
                            <Image
                                src={headerImage}
                                alt={post.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    )}

                    {/* Contenido del artículo */}
                    <article className="p-8 md:p-12">
                        {/* Resumen o introducción */}
                        <div className="mb-8 text-lg text-gray-700 font-medium border-l-4 border-indigo-500 pl-4 italic">
                            {post.summary}
                        </div>

                        {/* Contenido principal con estilos mejorados */}
                        <div className="prose prose-lg lg:prose-xl max-w-none prose-headings:text-indigo-900 prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-pre:bg-gray-50 prose-pre:border prose-pre:border-gray-200">
                            <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
                        </div>

                        {/* Sección de autor */}
                        <div className="mt-12 pt-8 border-t border-gray-200">
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xl">
                                    {siteConfig.name.charAt(0)}
                                </div>
                                <div className="ml-4">
                                    <p className="font-medium">{siteConfig.creator || 'Equipo Editorial'}</p>
                                    <p className="text-sm text-gray-600">Equipo de {siteConfig.name}</p>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>

                {/* Sección de navegación entre artículos */}
                <div className="max-w-4xl mx-auto mt-12 flex flex-col sm:flex-row justify-between">
                    <Link href="/blog" className="bg-white px-6 py-3 rounded-lg shadow-sm border border-gray-200 mb-4 sm:mb-0 hover:bg-gray-50 transition-colors flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Volver al Blog
                    </Link>

                    <div className="bg-indigo-50 px-6 py-3 rounded-lg border border-indigo-100 text-center">
                        <p className="text-sm text-indigo-700 mb-1">¿Te ha gustado este artículo?</p>
                        <Link href="/membership" className="text-indigo-600 font-medium hover:underline">
                            Accede a contenido premium →
                        </Link>
                    </div>
                </div>

                {/* Sección de artículos relacionados - Placeholder */}
                <div className="max-w-4xl mx-auto mt-16">
                    <h2 className="text-2xl font-bold mb-6 text-center">Continúa aprendiendo</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Link href="/blog" className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <h3 className="font-bold text-lg mb-2 text-indigo-700">Explora más artículos</h3>
                            <p className="text-gray-600">Descubre todos nuestros recursos y tutoriales sobre análisis de datos.</p>
                        </Link>
                        <Link href="/courses" className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <h3 className="font-bold text-lg mb-2 text-indigo-700">Cursos relacionados</h3>
                            <p className="text-gray-600">Profundiza tus conocimientos con nuestros cursos especializados.</p>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}