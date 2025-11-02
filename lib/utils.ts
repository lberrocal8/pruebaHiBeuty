import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import crypto from "crypto";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Hash simple (sin bcrypt porque no hay base real) y validación.
export const hashPassword = (password: string) => 
  crypto.createHash("sha256").update(password).digest("hex");

export const comparePassword = (password: string, hash: string) =>
  hashPassword(password) === hash;
