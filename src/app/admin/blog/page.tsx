"use client";

import React, { useEffect, useState } from "react";

type BlogPost = {
    entrada_id: number;
    titulo: string;
    slug: string;
    resumen: string;
    contenido_md: string;
    autor_id?: number;
    categoria_id?: number;
    url_miniatura?: string;
    url_imagen?: string;
    fecha_publicacion?: string;
};

export default function AdminBlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
    const [formData, setFormData] = useState<Partial<BlogPost>>({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function fetchPosts() {
        setLoading(true);
        try {
            const res = await fetch("/api/blog");
            if (!res.ok) throw new Error("Error fetching posts");
            const data = await res.json();
            setPosts(data);
        } catch (err) {
            setError("Error al cargar posts");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function startEdit(post: BlogPost) {
        setEditingPost(post);
        setFormData(post);
    }

    function cancelEdit() {
        setEditingPost(null);
        setFormData({});
    }

    async function handleDelete(id: number) {
        if (!confirm("¿Seguro que quieres eliminar este post?")) return;
        try {
            const res = await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Error deleting post");
            fetchPosts();
        } catch {
            alert("Error al eliminar post");
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const method = editingPost ? "PUT" : "POST";
        const url = editingPost ? `/api/admin/blog/${editingPost.entrada_id}` : "/api/admin/blog";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (!res.ok) throw new Error("Error saving post");
            setEditingPost(null);
            setFormData({});
            fetchPosts();
        } catch {
            setError("Error al guardar post");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Administrar Entradas del Blog</h1>

            {error && <p className="text-red-600 mb-4">{error}</p>}

            <button
                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
                onClick={() => {
                    setEditingPost(null);
                    setFormData({});
                }}
            >
                Crear Nueva Entrada
            </button>

            <form onSubmit={handleSubmit} className="mb-8 border p-4 rounded bg-gray-50">
                <input
                    type="text"
                    name="titulo"
                    placeholder="Título"
                    value={formData.titulo || ""}
                    onChange={handleInputChange}
                    required
                    className="w-full mb-2 p-2 border rounded"
                />
                <input
                    type="text"
                    name="slug"
                    placeholder="Slug"
                    value={formData.slug || ""}
                    onChange={handleInputChange}
                    required
                    className="w-full mb-2 p-2 border rounded"
                />
                <textarea
                    name="resumen"
                    placeholder="Resumen"
                    value={formData.resumen || ""}
                    onChange={handleInputChange}
                    required
                    className="w-full mb-2 p-2 border rounded"
                    rows={3}
                />
                <textarea
                    name="contenido_md"
                    placeholder="Contenido Markdown"
                    value={formData.contenido_md || ""}
                    onChange={handleInputChange}
                    required
                    className="w-full mb-2 p-2 border rounded"
                    rows={8}
                />
                <input
                    type="text"
                    name="url_miniatura"
                    placeholder="URL Miniatura"
                    value={formData.url_miniatura || ""}
                    onChange={handleInputChange}
                    className="w-full mb-2 p-2 border rounded"
                />
                <input
                    type="text"
                    name="url_imagen"
                    placeholder="URL Imagen"
                    value={formData.url_imagen || ""}
                    onChange={handleInputChange}
                    className="w-full mb-2 p-2 border rounded"
                />
                <input
                    type="datetime-local"
                    name="fecha_publicacion"
                    placeholder="Fecha Publicación"
                    value={formData.fecha_publicacion ? new Date(formData.fecha_publicacion).toISOString().slice(0, 16) : ""}
                    onChange={handleInputChange}
                    className="w-full mb-2 p-2 border rounded"
                />

                <div className="flex space-x-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 bg-green-600 text-white rounded"
                    >
                        {editingPost ? "Actualizar" : "Crear"}
                    </button>
                    {editingPost && (
                        <button
                            type="button"
                            onClick={cancelEdit}
                            className="px-4 py-2 bg-gray-400 text-white rounded"
                        >
                            Cancelar
                        </button>
                    )}
                </div>
            </form>

            <h2 className="text-xl font-semibold mb-2">Entradas Existentes</h2>
            {loading && <p>Cargando...</p>}
            {!loading && posts.length === 0 && <p>No hay entradas.</p>}
            <ul>
                {posts.map((post) => (
                    <li key={post.entrada_id} className="mb-4 border-b pb-2">
                        <h3 className="text-lg font-bold">{post.titulo}</h3>
                        <p>{post.resumen}</p>
                        <div className="space-x-2 mt-1">
                            <button
                                onClick={() => startEdit(post)}
                                className="px-3 py-1 bg-yellow-500 text-white rounded"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => handleDelete(post.entrada_id)}
                                className="px-3 py-1 bg-red-600 text-white rounded"
                            >
                                Eliminar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
