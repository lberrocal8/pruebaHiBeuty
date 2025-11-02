"use client"

import { useAuthStore } from "@/lib/store";
import { registerSchema } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { apiRegister } from "@/lib/api";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "sonner"
import { Check } from "lucide-react";

export default function HomeRegisterPage() {
  const router = useRouter();
  const setUser = useAuthStore((set) => set.setUser);
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    setError("");
    const res = await apiRegister(data);
    if (res.error) {
      toast.error(res.error);
      return setError(res.error);
    }
    toast.success("Registro exitoso. Redireccionando...");
    setUser(res.usuario);
    router.push("/dashboard");
  };

  const handleLogin = () => {
    router.push("/login");
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Registrarse</CardTitle>
          <CardDescription>
            Ingresa tus credenciales para crear una cuenta.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombres</FormLabel>
                    <FormControl>
                      <Input placeholder="Tu nombre completo" autoComplete="off" {...field} />
                    </FormControl>
                    <FormMessage />
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
                      <Input placeholder="m@example.com" autoComplete="off" {...field} />
                    </FormControl>
                    <FormMessage />
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
                      <Input autoComplete="off" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                <Check />
                Crear cuenta
              </Button>
            </form>
          </Form>
          <Button variant="link" className="w-full" onClick={handleLogin}>Ya tengo una cuenta</Button>
        </CardContent>
      </Card>
    </div>
  );
}