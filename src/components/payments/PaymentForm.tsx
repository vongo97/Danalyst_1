"use client";

import React, { useState } from "react";

interface PaymentFormProps {
    priceId: string;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({ priceId }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleCheckout = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/payments/create-mercadopago-preference", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ priceId }),
            });

            const data = await response.json();

            if (data.init_point) {
                window.location.href = data.init_point;
            } else {
                setError("Error al crear la preferencia de pago.");
            }
        } catch (err) {
            setError("Error de red al crear la preferencia de pago.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button
                onClick={handleCheckout}
                disabled={loading}
                className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            >
                {loading ? "Procesando..." : "Pagar ahora"}
            </button>
            {error && <p className="mt-2 text-red-600">{error}</p>}
        </div>
    );
};
