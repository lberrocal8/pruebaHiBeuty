'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useRouter } from 'next/navigation'
import { BadgeCheck } from 'lucide-react';

export default function Example() {
  const router = useRouter();

  const loging = async () => {
    router.push('/login');
  }
  const register = async () => {
    router.push('/register');
  }

  return (
    <div className='flex flex-col min-h-screen'>
      <header className="absolute inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">HangarSoft</span>
              <img
                alt=""
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </a>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-2">
            <Button onClick={loging}>Iniciar sesión</Button>
            <Button className='text-white' onClick={register} variant={"link"}>Registrarse</Button>
          </div>
        </nav>
      </header>

      <div className="flex flex-col pl-12 gap-12 items-center w-full py-24 sm:py-30 lg:py-40 bg-[url(/2149126949.jpg)] bg-cover bg-center flex-1">
        <div className='flex flex-col max-w-2xl items-center text-center'>
          <h1 className="text-4xl font-bold sm:text-6xl text-purple-100"><span className='text-violet-700'>Construye</span> el futuro. Desarrolla <span className='text-violet-700'>inteligente</span></h1>
          <p className="mt-4 text-md font-medium text-gray-100 sm:text-xl/8">
            Desbloquea tu potencial con herramientas esenciales para desarrolladores, diseñadas para impulsar tu productividad y creatividad.
          </p>
          <div className="mt-6 flex items-center gap-x-2">
            <Button onClick={register}>Compra ahora</Button>
            <Button variant={"secondary"} onClick={register}>Solicita una demo</Button>
          </div>
        </div>

        <div className='flex w-full max-w-4xl gap-6 items-center'>
          <div className='w-full max-w-3xl'>
            <Card className='bg-white/20 backdrop-blur-lg border-purple-900'>
              <CardHeader className='text-center'>
                <CardTitle>
                  <div className='flex flex-col'>
                    <span className='text-2xl font-semibold'>Básico</span>
                    <span className='text-3xl font-bold'>9&euro;/mes</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='flex flex-col gap-10'>
                  <ul className='grid gap-2 text-left'>
                    <div className='flex items-center gap-2'>
                      <BadgeCheck className='h-5 w-5' />
                      <li>Acceso a Cloud IDE</li>
                    </div>
                    <div className='flex items-center gap-2'>
                      <BadgeCheck className='h-5 w-5' />
                      <li>10Gb de almacenamiento</li>
                    </div>
                    <div className='flex items-center gap-2'>
                      <BadgeCheck className='h-5 w-5' />
                      <li>Soporte básico</li>
                    </div>
                    <div className='flex items-center gap-2'>
                      <BadgeCheck className='h-5 w-5' />
                      <li>Foros comunitarios</li>
                    </div>
                  </ul>
                  <Button onClick={register}>Comprar ahora</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className='w-full max-w-3xl'>
            <Card className='bg-white/60 backdrop-blur-lg border-2 border-purple-900 h-[350px]'>
              <CardHeader className='text-center'>
                <CardTitle>
                  <div className='flex flex-col'>
                    <span className='text-2xl font-semibold'>Pro</span>
                    <span className='text-3xl font-bold'>29&euro;/mes</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='flex flex-col gap-10'>
                  <ul className='grid gap-2 text-left'>
                    <div className='flex items-center gap-2'>
                      <BadgeCheck className='h-5 w-5' />
                      <li>Acceso a Cloud IDE</li>
                    </div>
                    <div className='flex items-center gap-2'>
                      <BadgeCheck className='h-5 w-5' />
                      <li>Soporte prioritario</li>
                    </div>
                    <div className='flex items-center gap-2'>
                      <BadgeCheck className='h-5 w-5' />
                      <li>Repositorios privados</li>
                    </div>
                    <div className='flex items-center gap-2'>
                      <BadgeCheck className='h-5 w-5' />
                      <li>Colaboración en tiempo real</li>
                    </div>
                  </ul>
                  <Button onClick={register}>Comprar ahora</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className='w-full max-w-3xl'>
            <Card className='bg-white/20 backdrop-blur-lg border-purple-900 h-[350px]'>
              <CardHeader className='text-center'>
                <CardTitle>
                  <div className='flex flex-col'>
                    <span className='text-2xl font-semibold'>Premium</span>
                    <span className='text-3xl font-bold'>79&euro;/mes</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='flex flex-col gap-10'>
                  <ul className='grid gap-2 text-left'>
                    <div className='flex items-center gap-2'>
                      <BadgeCheck className='h-5 w-5' />
                      <li>Almacenamiento ilimitado</li>
                    </div>
                    <div className='flex items-center gap-2'>
                      <BadgeCheck className='h-5 w-5' />
                      <li>Soporte dedicado 24/7</li>
                    </div>
                    <div className='flex items-center gap-2'>
                      <BadgeCheck className='h-5 w-5' />
                      <li>Integraciones personalizadas</li>
                    </div>
                    <div className='flex items-center gap-2'>
                      <BadgeCheck className='h-5 w-5' />
                      <li>SSO y Logs</li>
                    </div>
                  </ul>
                  <Button onClick={register}>Comprar ahora</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
