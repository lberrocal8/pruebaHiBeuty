"use client"

import { useAuthStore } from "@/lib/store"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Toaster } from "@/components/ui/sonner"
import "@/app/globals.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  if (!user) return null;

  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger className="ml-1 mt-1 w-8 h-8" />
        <div className="ml-5 mt-2">
          {children}
          <Toaster position="top-center" richColors />
        </div>
      </main>
    </SidebarProvider>
  );
}