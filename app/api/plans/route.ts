import { NextResponse } from "next/server";
import { readData } from "@/lib/db";

interface Plan {
  id: string;
  nombre: string;
  precio: number;
  beneficios: string[];
}

export async function GET(req: Request) {
  const planes = readData<Plan>("plans");

  if (!planes) {
    return NextResponse.json({ error: "No hay planes que mostrar" }, { status: 404 });
  }

  return NextResponse.json(planes);
}