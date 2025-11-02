"use client"

import { useAuthStore } from "@/lib/store"

export default function HomeDashboardPage() {
  const { user, logout } = useAuthStore();

  return (
    <div className="flex w-full">
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">
          Bienvenido, {user?.nombre}
        </h1>
        <p>Selecciona una opción del menú lateral.</p>
      </main>
    </div>
  );
}