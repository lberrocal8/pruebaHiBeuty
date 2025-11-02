import { NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { hashPassword } from "@/lib/utils";

interface Usuario {
  id: string;
  nombre: string;
  correo: string;
  password: string;
  planActivo: string;
  fechaRegistro: string;
}

//funcion para obtener el perfil
export async function GET(req: Request, { params }: { params: { id?: string } | Promise<{ id?: string }> }) {
  try {
    const usuarios = readData<Usuario>("users");
  const idParams = params && typeof (params as any).then === "function" ? await (params as any) : params;
  const userId = idParams && (idParams as any).id ? String((idParams as any).id).trim() : "";
  const user = usuarios.find(u => String(u.id).trim() === userId);

    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    const { password, ...publicData } = user;
    return new NextResponse(JSON.stringify(publicData), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

//funcion para actualizar el perfil
export async function PUT(req: Request, { params }: { params: { id?: string } | Promise<{ id?: string }> }) {
  try {
    const { nombre, correo, password } = await req.json();
    const usuarios = readData<Usuario>("users");
  const idParams = params && typeof (params as any).then === "function" ? await (params as any) : params;
  const userId = idParams && (idParams as any).id ? String((idParams as any).id).trim() : "";
  const index = usuarios.findIndex((user) => String(user.id).trim() === userId);

    if (index === -1) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    if (nombre) usuarios[index].nombre = nombre;
    if (correo) usuarios[index].correo = correo;
    if (password) usuarios[index].password = hashPassword(password);

    writeData("users", usuarios);

    return NextResponse.json({
      message: "Perfil actualizado correctamente",
      usuario: usuarios[index],
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
