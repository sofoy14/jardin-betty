# 🌸 Jardín Betty - Sitio Web + Panel Administrativo

Sitio web profesional para florería Jardín Betty con catálogo de productos, sistema de pedidos y panel administrativo completo.

## ✨ Características

- 🌐 **Página web pública** con catálogo de arreglos florales
- 🔐 **Panel administrativo** para gestionar productos, categorías y pedidos
- 📱 **Diseño responsive** - funciona en móviles, tablets y desktop
- 🎨 **Categorías personalizables** (San Valentín, Bodas, Condolencias, etc.)
- 🛒 **Sistema de pedidos** con seguimiento de estados
- 📊 **Dashboard** con estadísticas de ventas
- 💾 **Persistencia local** - los datos se guardan en el navegador

## 🚀 Tecnologías

- React + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- React Router
- Framer Motion

## 📁 Estructura

```
app/
├── src/
│   ├── admin/          # Panel administrativo
│   ├── sections/       # Secciones de la página principal
│   ├── components/     # Componentes reutilizables
│   └── data/           # Datos por defecto
├── public/
│   ├── images/         # Fotos de productos
│   └── manual.html     # Manual de usuario
└── dist/               # Build de producción
```

## 🛠️ Instalación local

```bash
cd app
npm install
npm run dev
```

## 🔑 Acceso al Panel Admin

- **URL:** `/admin`
- **Usuario:** `admin`
- **Contraseña:** `jardinbetty2024`

## 📖 Manual de Usuario

Disponible en `/manual.html` una vez desplegado, o abrir `app/public/manual.html` directamente.

## 🌐 Despliegue

Configurado para desplegar en Vercel:
- Framework: Vite
- Root Directory: `app`
- Build: `npm run build`
- Output: `dist`

---

Desarrollado por [Vectrum Consulting](https://github.com/sofoy14)
