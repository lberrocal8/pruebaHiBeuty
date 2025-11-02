import { NextResponse } from "next/server";
import { readData } from "@/lib/db";

interface Producto {
  id: string;
  nombre: string;
  categoria: string;
  planRequerido: string;
  imagen: string;
}

interface Plan {
  id: string;
  nombre: string;
  precio: number;
  beneficios: string[];
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const planId = searchParams.get("planId");

  const productos = readData<Producto>("products");
  const planes = readData<Plan>("plans");

  if (!planId) {
    return NextResponse.json(productos);
  }

  
  const planIndex = planes.findIndex((plan) => plan.id === planId);
  const visibles = productos.filter((prod) => {
    const reqIndex = planes.findIndex((plan) => plan.id === prod.planRequerido);
    return reqIndex <= planIndex; // incluye productos de planes inferiores
  });

  return NextResponse.json(visibles);
}
