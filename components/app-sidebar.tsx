import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store"
import { User, CreditCard, Book, Settings, LogOut } from "lucide-react"

const itemsSideBar = [
  {
    title: "Mi Perfil",
    url: "/dashboard/profile",
    icon: "User",
  },
  {
    title: "Mi Suscripción",
    url: "/dashboard/subscription",
    icon: "CreditCard",
  },
  {
    title: "Catalogo",
    url: "/dashboard/catalog",
    icon: "Book",
  },
  {
    title: "Configuración",
    url: "/dashboard/settings",
    icon: "Settings",
  }
]

export function AppSidebar() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="pt-2">
          Bienvenido, <span className="font-bold">{user?.nombre}</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Aplicación</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {itemsSideBar.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      {/* <item.icon /> */}
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button
          onClick={() => {
            logout;
            router.push("/login");
          }}
        >
          <LogOut />
          Cerrar sesión
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}