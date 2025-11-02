# 🧴 Prueba Hibeauty

Aplicación desarrollada como parte de una prueba técnica para **Hibeauty**, utilizando **Next.js** y **TypeScript**.  

---

## 🚀 Instrucciones de instalación y ejecución

### 1. Clonar el repositorio
```bash
git clone https://github.com/lberrocal8/pruebaHiBeuty.git
cd pruebaHiBeuty
```

### 2. Instalar dependencias
```bash
npm install
# o
yarn install
```

### 3. Ejecutar aplicación en entorno de desarrollo
```bash
npm run dev
# o
yarn dev
```

### 4. Compilar para producción
```bash
npm run build
npm run start
```

## 🧩 Librerias utilizadas
| **Tipo**            | **Libreria**                                       | **Descripción**                                   |
|---------------------|----------------------------------------------------|---------------------------------------------------|
| Framework principal | next                                               | Framework React con renderizado híbrido (SSR/CSR) |
| Lenguaje            | typescript                                         | Tipado estático para mayor robustez               |
| Estilos             | tailwind css                                       |                                                   |
| Linting             | eslint                                             | Control de calidad de código                      |
| Hooks / Utilidades  | react-hook-form, zod, etc.                         | Manejo de formularios y validación                |
| UI                  | Shadcn/UI, TailwindCSS, Lucide React Icons         |                                                   |
|                     |                                                    |                                                   |

## ⚙️ Funcionalidades implementadas
- Estructura modular basada en Next.js app directory
- Lógica reutilizable en hooks/
- Componentes reutilizables en components/
- Gestión de perfil
- Suscripción a productos
- Cancelación de suscripción a productos
- Modificación de suscripción a productos
- Implementación de Ingreso/Registro de usuarios
- Validación de formularios

## 🚧 Limitaciones conocidas
- Falta documentación detallada de endpoints o variables de entorno
- Sin pruebas automatizadas (unitarias o de integración)

## 🧠 Decisiones técnicas
- Se eligió Next.js 14+ con la carpeta app/ por su soporte nativo para renderizado híbrido (SSR/CSR).
- TypeScript fue adoptado para asegurar escalabilidad y minimizar errores de tipo.
- Se opta por utilizar JSON persistente por la facilidad de implementación
- Shadcn/ui brinda componentes listos para la construcción rapida de UI

## ⏱️ Tiempo invertido
- En el desarrollo de este proyecto se invirtieron aprox. 25 hrs de trabajo repartidos en dos días de trabajo
