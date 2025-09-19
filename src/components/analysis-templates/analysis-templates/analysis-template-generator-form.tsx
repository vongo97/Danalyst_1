'use client';

import { useState } from 'react';
import { marked } from 'marked';
import { LoadingButton } from '@/components/ui/loading';

export function AnalysisTemplateGeneratorForm() {
    const [purpose, setPurpose] = useState('');
    const [audience, setAudience] = useState('');
    const [template, setTemplate] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setTemplate('');

        try {
            const response = await fetch('/api/generate-analysis-template', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ purpose, audience }),
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 429) {
                    throw new Error("Has excedido el límite de solicitudes. Por favor, intenta de nuevo más tarde.");
                } else {
                    throw new Error(data.error || 'Error al generar la plantilla');
                }
            }

            setTemplate(data.template);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error desconocido');
        } finally {
            setIsLoading(false);
        }
    };

    // Función para renderizar markdown
    const renderMarkdown = (text: string) => {
        try {
            // Configurar marked para que sea seguro
            marked.setOptions({
                breaks: true, // Permite saltos de línea con un solo retorno de carro
                gfm: true     // GitHub Flavored Markdown
            });

            // Convertir markdown a HTML
            const html = marked(text);

            return { __html: html };
        } catch (error) {
            console.error("Error al renderizar markdown:", error);
            return { __html: text.replace(/\n/g, '<br>') };
        }
    };

    // Estilos personalizados para el contenido markdown
    const markdownStyles = {
        // Estilos para los enlaces (cambiando el color verde a índigo)
        a: {
            color: '#4F46E5', // Color índigo-600
            textDecoration: 'underline',
        },
        // Estilos para el código en línea (cambiando el fondo verde a índigo claro)
        'code': {
            backgroundColor: '#EEF2FF', // Color índigo-50
            color: '#4F46E5', // Color índigo-600
            padding: '0.2em 0.4em',
            borderRadius: '3px',
            fontSize: '0.9em',
        },
        // Estilos para las listas
        'ul li::marker, ol li::marker': {
            color: '#4F46E5', // Color índigo-600
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-1">
                        Propósito de la plantilla *
                    </label>
                    <textarea
                        id="purpose"
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Ej: Análisis exploratorio de datos de ventas mensuales"
                        rows={3}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="audience" className="block text-sm font-medium text-gray-700 mb-1">
                        Audiencia objetivo (opcional)
                    </label>
                    <input
                        type="text"
                        id="audience"
                        value={audience}
                        onChange={(e) => setAudience(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Ej: Equipo directivo, Departamento de marketing"
                    />
                </div>

                <LoadingButton
                    type="submit"
                    loading={isLoading}
                    disabled={!purpose}
                    className="w-full py-3 px-4 bg-indigo-600 text-white rounded-md font-medium transition-colors hover:bg-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Generando...' : 'Generar Plantilla'}
                </LoadingButton>
            </form>

            {error && (
                <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                    <p className="font-medium">Error</p>
                    <p>{error}</p>
                </div>
            )}

            {template && (
                <div className="mt-8">
                    <h3 className="text-xl font-bold mb-4">Plantilla Generada</h3>
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-md overflow-auto">
                        {/* Contenedor con desplazamiento horizontal y estilos personalizados */}
                        <style jsx global>{`
                            .markdown-content a { color: #4F46E5; }
                            .markdown-content code { background-color: #EEF2FF; color: #4F46E5; padding: 0.2em 0.4em; border-radius: 3px; font-size: 0.9em; }
                            .markdown-content ul li::marker, .markdown-content ol li::marker { color: #4F46E5; }
                            .markdown-content h1, .markdown-content h2, .markdown-content h3, .markdown-content h4, .markdown-content h5, .markdown-content h6 { color: #4338CA; }
                            .markdown-content strong { color: #4338CA; }
                        `}</style>
                        <div
                            className="prose max-w-none overflow-x-auto markdown-content"
                            style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}
                            dangerouslySetInnerHTML={renderMarkdown(template)}
                        />
                    </div>
                    <div className="mt-4 flex justify-end">
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(template);
                                alert('Plantilla copiada al portapapeles');
                            }}
                            className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 transition-colors font-medium"
                        >
                            Copiar al portapapeles
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}