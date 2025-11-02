import { NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";

interface Usuario {
  id: string;
  nombre: string;
  correo: string;
  password: string;
  planActivo: string;
}

export async function POST(req: Request) {
  const { userId, planId } = await req.json();
  const usuarios = readData<Usuario>("users");
  const index = usuarios.findIndex((user) => user.id.trim() === userId?.trim());
  
  if(index === -1) {
    return NextResponse.json({ error: "Usuario no encontrado en la base de datos" }, { status: 404 });
  }

  usuarios[index].planActivo = planId;
  writeData("users", usuarios);

  return NextResponse.json({
    message: "Suscripción actualizada",
    usuario: usuarios[index],
  })
}