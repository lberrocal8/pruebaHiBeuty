"use client"

import { useAuthStore } from "@/lib/store"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CircleFadingArrowUp } from "lucide-react"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { toast } from "sonner"

const profileSchema = z.object({
  nombre: z.string().min(2),
  correo: z.email(),
  password: z.string().optional(),
});

export default function HomePerfilPage() {
  const { user, refreshUser } = useAuthStore();
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      nombre: user?.nombre || "",
      correo: user?.correo || "",
    },
  });

  const onSubmit = async (data: z.infer<typeof profileSchema>) => {
    const res = await fetch(`/api/users/${user?.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (result.error) {
      toast.error("Error al actualizar el perfil", {
        description: result.error,
      });
    } else {
      await refreshUser();
      toast.success("Perfil actualizado correctamente");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Mi Perfil</h1>
      <div className="w-full max-w-3xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombres</FormLabel>
                  <FormControl>
                    <Input autoComplete="off" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="correo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo electronico</FormLabel>
                  <FormControl>
                    <Input autoComplete="off" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input placeholder="Nueva contraseña (opcional)" type="password" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit">
              <CircleFadingArrowUp />
              Actualizar
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}