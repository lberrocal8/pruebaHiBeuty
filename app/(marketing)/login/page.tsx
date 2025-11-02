"use client";

import { apiLogin } from "@/lib/api";
import { useAuthStore } from "@/lib/store";
import { loginSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { LogIn } from "lucide-react";

export default function HomeLoginPage() {
  const router = useRouter();
  const setUser = useAuthStore((set) => set.setUser);
  const [error, setError] = useState("");
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    const res = await apiLogin(data);
    if (res.error) {
      toast.error("Error", {
        description: res.error,
      })
    } else {
      toast.success("Correcto. Redireccionando...");
      setUser(res.usuario);
      router.push("/dashboard");
    }
  };

  const handleRegister = () => {
    router.push("/register");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Iniciar sesión</CardTitle>
          <CardDescription>
            Ingresa tus credenciales para ingresar al sistema.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                <LogIn />
                Ingresar
              </Button>
            </form>
          </Form>
          <Button variant="link" className="w-full" onClick={handleRegister}>No tengo una cuenta</Button>
        </CardContent>
      </Card>
    </div>
  );
}