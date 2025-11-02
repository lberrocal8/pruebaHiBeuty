import { NextResponse } from "next/server";
import { readData } from "@/lib/db";
import { comparePassword } from "@/lib/utils";

interface Usuario {
  id: string;
  nombre: string;
  correo: string;
  password: string;
  planActivo: string;
}

export async function POST(req: Request) {
  const { correo, password } = await req.json();
  const usuarios = readData<Usuario>("users");
  const user = usuarios.find((user) => user.correo === correo);
  
  if (!user || !comparePassword(password, user.password)) {
    return NextResponse.json({ error: "Credenciales invalidas" }, { status: 401 })
  }

  return NextResponse.json({
    message: "Inicio de sesión exitoso",
    usuario: {
      id: user.id,
      nombre: user.nombre,
      correo: user.correo,
      planActivo: user.planActivo,
    }
  });
}