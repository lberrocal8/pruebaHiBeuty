import { NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { hashPassword } from "@/lib/utils";
import crypto from "crypto";

interface Usuario {
  id: string;
  nombre: string;
  correo: string;
  password: string;
  planActivo?: string;
  fechaRegistro: string;
}

export async function POST(req: Request) {
  const { nombre, correo, password } = await req.json();

  if (!nombre || !correo || !password) {
    return NextResponse.json({ error: "Datos incompletos" },{ status: 400 });
  }

  const usuarios = readData<Usuario>("users");
  if (usuarios.find((user) => user.correo === correo)) {
    return NextResponse.json({ error: "El correo ya existe" }, { status: 400 });
  }

  const nuevo: Usuario = {
    id: crypto.randomUUID(),
    nombre,
    correo,
    password: hashPassword(password),
    fechaRegistro: new Date().toISOString(),
  };
  
  usuarios.push(nuevo);
  writeData("users", usuarios);

  return NextResponse.json({ message: "Usuario registrado correctamente", usuario: nuevo });
}
