"use client"

import { useAuthStore } from "@/lib/store"
import { BadgeCheck } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export default function HomeSubscriptionPage() {
  const { user, refreshUser } = useAuthStore();
  const [planes, setPlanes] = useState<any[]>([]);
  const [openDialogSuscription, setOpenDialogSubscription] = useState(false);

  useEffect(() => {
    fetch("/api/plans")
      .then((result) => result.json())
      .then(setPlanes);
  }, [user?.planActivo]); // Re-fetch cuando cambie el plan activo

  const handlePlan = async (planId: string) => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user?.id, planId }),
    });
    const result = await res.json();

    if (result.error) {
      toast.error("Error", {
        description: result.error,
      });
    } else {
      await refreshUser();
      toast.success("Suscripción actualizada", {
        description: `Plan seleccionado: ${planId}`,
      });
      setOpenDialogSubscription(false);
    }
  };

  const handleCancelarSuscripcion = async () => {
    if (!user?.planActivo || user.planActivo === "Ninguno") {
      toast.error("No tienes una suscripción activa para cancelar.");
      return;
    }

    toast.warning("Cancelando suscripción...", {
      description: "¿Estás seguro de que deseas cancelar tu suscripción actual?",
      action: {
        label: "Sí, cancelar",
        onClick: async () => {
          handlePlan("Ninguno");
        }
      }
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Mi Suscripción</h1>
      <p>Plan actual: {user?.planActivo || <span className="font-bold">Ninguno</span>}</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 mb-6">
        {planes.map((plan) => (
          <div key={plan.id} className="border p-4 rounded-lg flex flex-col">
            <h2 className="text-sm font-medium">{plan.nombre}</h2>
            <p className="text-md font-bold">{plan.precio}€ / mes</p>
            <ul className="text-sm mt-2">
              {plan.beneficios.map((beneficts: string) =>
                <li key={beneficts} className="flex gap-2 items-center">
                  <BadgeCheck className="w-4 h-4" />
                  {beneficts}
                </li>
              )}
            </ul>

            <Dialog open={openDialogSuscription} onOpenChange={setOpenDialogSubscription}>
              <DialogTrigger asChild>
                <Button
                  disabled={user?.planActivo === plan.id}
                  className="mt-4"
                >
                  {user?.planActivo === plan.id ? "Activo" : "Suscribirme"}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Plan {plan.nombre}</DialogTitle>
                  <DialogDescription>
                    Estas a punto de suscribirte al plan <strong>{plan.nombre}</strong> por <strong>{plan.precio}€ / mes</strong>. Confirmemos tus datos y procedamos al pago.
                  </DialogDescription>
                </DialogHeader>
                <div className="text-sm">
                  <p className="font-semibold mb-2">Tu información personal</p>
                  <p><span className="font-semibold">Nombre:</span> {user?.nombre}</p>
                  <p><span className="font-semibold">Correo electronico:</span> {user?.correo}</p>
                </div>
                <div className="text-sm">
                  <p className="font-semibold mb-2">Metodo de pago</p>
                  <div className="flex gap-3 items-center">
                    {[
                      { src: "/maestro.png", alt: "Maestro" },
                      { src: "/paypal.png", alt: "PayPal" },
                      { src: "/visa.png", alt: "Visa" },
                      { src: "/express.png", alt: "American Express" },
                    ].map((m, i) => (
                      <label key={m.src} className="cursor-pointer">
                        <input
                          type="radio"
                          name={`payment-${plan.id}`}
                          defaultChecked={i === 0}
                          className="peer sr-only"
                        />
                        <div className="rounded-md border px-2 py-1 flex items-center justify-center peer-checked:ring-2 peer-checked:ring-indigo-600 peer-checked:shadow-lg">
                          <img src={m.src} alt={m.alt} className="h-8 w-auto" />
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="text-sm">
                  <p className="font-semibold">Plan seleccionado</p>
                  <span>{plan.nombre} - {plan.precio}€ / mes</span>
                </div>
                <div className="text-sm mb-2 text-gray-500">
                  <p>El plan seleccionado cuenta con los siguientes beneficios</p>
                  {plan.beneficios.map((beneficts: string) =>
                    <p key={beneficts} className="flex gap-2 items-center">
                      <BadgeCheck className="w-4 h-4" />
                      {beneficts}
                    </p>
                  )}
                </div>
                <Button onClick={() => handlePlan(plan.id)}>Confirmar suscripción</Button>
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </div>
      <Button variant={"link"} onClick={handleCancelarSuscripcion}>Cancelar suscripción actual</Button>
    </div>
  );
}