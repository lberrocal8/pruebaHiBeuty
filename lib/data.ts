export interface Plan {
  id: string;
  nombre: string;
  precio: number;
  beneficios: string[];
}

export interface Usuario {
  id: string;
  nombre: string;
  correo: string;
  password: string;
  planActivo?: string;
  fechaRegistro: string;
}

export interface Producto {
  id: string;
  nombre: string;
  categoria: string;
  planRequerido: string;
  imagen: string;
}

export const usuarios: Usuario[] = [];
export const productos: Producto[] = [];
export const planes: Plan[] = [];
