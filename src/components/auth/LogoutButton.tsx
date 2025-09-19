"use client";

import { signOut } from "next-auth/react";
import React from "react";

export default function LogoutButton() {
    return (
        <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
            Cerrar sesión
        </button>
    );
}
