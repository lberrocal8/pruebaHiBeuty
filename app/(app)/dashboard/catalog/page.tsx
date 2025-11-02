"use client"

import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/store";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function HomeCatalogoPage() {
  const { user } = useAuthStore();
  const [productos, setProductos] = useState<any[]>([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    if (!user) return;
    fetch(`/api/products?planId=${user.planActivo || "basic"}`)
      .then((r) => r.json())
      .then(setProductos);
  }, [user?.planActivo]);

  const filtrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Catálogo</h1>
      <Input
        placeholder="Buscar producto..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="max-w-md mb-6"
      />

      {filtrados.length === 0 && <p>No hay productos disponibles.</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filtrados.map((p) => (
          <div
            key={p.id}
            className="border p-4 rounded-lg flex flex-col justify-between"
          >
            <div>
              <img src={p.imagen} alt={p.nombre} className="rounded mb-3 h-32 object-cover" />
              <h2 className="font-semibold text-lg">{p.nombre}</h2>
              <p className="text-sm text-gray-600">{p.categoria}</p>
              <p className="text-xs text-gray-500 mt-2">
                Requiere plan: {p.planRequerido}
              </p>
            </div>
            <Button
              className="mt-4"
              onClick={() => alert(`Descargando ${p.nombre}...`)}
            >
              Descargar
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
