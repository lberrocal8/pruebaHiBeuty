//Estado global
import { create } from "zustand";

interface User {
  id: string;
  nombre: string;
  correo: string;
  planActivo: string;
  fechaRegistro?: string;
}

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  refreshUser: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: (() => {
    if (typeof window === "undefined") return null;
    try {
      const stored = localStorage.getItem("user");
      if (!stored) return null;
      const parsed = JSON.parse(stored);
      // Si el objeto tiene una estructura anidada incorrecta, intentamos recuperar el usuario correcto
      if (parsed.state && parsed.state.user) {
        return parsed.state.user;
      }
      return parsed;
    } catch (e) {
      console.error("Error parsing user from localStorage:", e);
      localStorage.removeItem("user"); // Limpiamos el localStorage si hay error
      return null;
    }
  })(),

  setUser: (user) => {
    set({ user });
    if (typeof window !== "undefined") {
      if (user) {
        // Aseguramos que guardamos solo el objeto usuario limpio
        const userToStore = {
          id: user.id,
          nombre: user.nombre,
          correo: user.correo,
          planActivo: user.planActivo
        };
        localStorage.setItem("user", JSON.stringify(userToStore));
      } else {
        localStorage.removeItem("user");
      }
    }
  },

  refreshUser: async () => {
    const user = get().user;
    if (!user) return;
    
    console.log('RefreshUser - Usuario actual:', user);
    console.log('RefreshUser - ID a buscar:', user.id);
    
    const res = await fetch(`/api/users/${encodeURIComponent(user.id.trim())}`, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
      },
      next: { revalidate: 0 }
    });
    
    if (!res.ok) return;
    
    const updated = await res.json();
    
    // Crear un objeto usuario limpio
    const cleanUser = {
      id: updated.id,
      nombre: updated.nombre,
      correo: updated.correo,
      planActivo: updated.planActivo
    };
    
    // Actualizar el estado con el objeto limpio
    set({ user: cleanUser });
    
    // Guardar el objeto limpio en localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem("user", JSON.stringify(cleanUser));
    }
  },

  logout: () => {
    set({ user: null });
    if (typeof window != "undefined") {
      localStorage.removeItem("user");
    }
  },
}));