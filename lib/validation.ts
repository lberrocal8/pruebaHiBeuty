//Esquemas Zod
import { z } from "zod";

export const registerSchema = z.object({
  nombre: z.string().min(2, "Mínimo 2 caracteres"),
  correo: z.email("Correo inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

export const loginSchema = z.object({
  correo: z.email("Correo invalido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
})