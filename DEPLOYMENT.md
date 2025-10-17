# Guía de Despliegue - QA Sports

Este proyecto es un monorepo con dos aplicaciones:
- **`client/`** - Frontend React + Vite
- **`api/`** - Backend NestJS + TypeORM

## 📦 Estructura del Proyecto

```
qa-sports/
├── client/                    # Frontend (React + Vite)
│   ├── src/
│   ├── .env                   # Variables de entorno locales (NO subir a git)
│   ├── .env.example           # Ejemplo de variables de entorno
│   ├── vercel-ignore-build.sh # Script para ignorar builds innecesarios
│   └── package.json
├── api/                       # Backend (NestJS) - Ignorado por Vercel
│   ├── src/
│   └── package.json
├── .vercelignore              # Excluye api/ del build de Vercel
└── vercel.json                # Configuración de Vercel para el frontend
```

## 🚀 Despliegue del Frontend en Vercel

### 1. Configuración Inicial

El archivo `vercel.json` en la raíz está configurado para el monorepo:

```json
{
  "buildCommand": "cd client && npm install && npm run build",
  "outputDirectory": "client/dist",
  "installCommand": "cd client && npm install",
  "ignoreCommand": "bash client/vercel-ignore-build.sh"
}
```

**Optimización de Builds**:
- El `ignoreCommand` ejecuta un script que evita builds innecesarios cuando solo hay cambios en la carpeta `api/`
- El archivo `.vercelignore` excluye completamente la carpeta `api/` del proceso de build de Vercel
- Esto ahorra tiempo y recursos de build, y evita conflictos con dependencias del backend

### 2. Pasos para Desplegar

#### Opción A: Desde Vercel Dashboard

1. **Conectar repositorio**:
   - Ve a [vercel.com](https://vercel.com)
   - Click en "Add New Project"
   - Importa tu repositorio de GitHub

2. **Configurar el proyecto**:
   - Vercel detectará automáticamente la configuración del `vercel.json`
   - **Root Directory**: Déjalo en la raíz (no selecciones `client/`)
   - **Framework Preset**: Vite
   - El `vercel.json` ya maneja las rutas correctas

3. **Variables de Entorno**:
   - En Settings → Environment Variables, agrega:

   | Variable | Valor | Entorno |
   |----------|-------|---------|
   | `VITE_API_URL` | `https://tu-api-backend.com/api` | Production |
   | `VITE_API_URL` | `https://tu-api-staging.com/api` | Preview (opcional) |

4. **Deploy**:
   - Click en "Deploy"
   - Vercel construirá automáticamente el proyecto

#### Opción B: Desde CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Desde la raíz del proyecto
vercel

# Para producción
vercel --prod
```

### 3. Configuración Post-Despliegue

#### Dominio Custom (opcional)
- Settings → Domains
- Agrega tu dominio personalizado

#### CORS en el Backend
Asegúrate de que tu API permita requests desde tu dominio de Vercel:

```typescript
// En tu api/src/main.ts
app.enableCors({
  origin: [
    'http://localhost:5173', // Local
    'https://tu-app.vercel.app', // Vercel
    'https://tu-dominio.com' // Custom domain
  ],
  credentials: true
});
```

## 🔧 Variables de Entorno

### Frontend (client/.env)

```env
# URL de la API (backend)
VITE_API_URL=http://192.168.1.68:3000/api
```

**IMPORTANTE**:
- Para producción, configura `VITE_API_URL` en Vercel apuntando a tu API en producción
- El archivo `.env` está en `.gitignore` y NO se sube a git
- Usa `.env.example` como referencia

### Backend (api/.env)

El backend necesitará sus propias variables de entorno si lo despliegas en otro servicio.

## 🛠️ Comandos Útiles

### Frontend (client/)

```bash
# Desarrollo
npm run dev

# Build con type checking
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

### Backend (api/)

```bash
# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod
```

## 🌐 Despliegue del Backend (API)

Para el backend NestJS, considera estas opciones:

### 1. Railway
- Soporta monorepos
- Fácil configuración con PostgreSQL/MySQL
- [railway.app](https://railway.app)

### 2. Render
- Plan gratuito disponible
- Soporta bases de datos
- [render.com](https://render.com)

### 3. AWS/Google Cloud/Azure
- Más control y escalabilidad
- Requiere más configuración

### 4. Heroku
- Clásico y confiable
- Fácil de usar
- [heroku.com](https://heroku.com)

## ⚠️ Consideraciones Importantes

1. **Base de Datos**: El backend usa SQL Server. Asegúrate de tener una instancia accesible desde tu servicio de hosting.

2. **Migraciones**: Ejecuta las migraciones antes del despliegue:
   ```bash
   cd api
   npm run migration:run:prod
   ```

3. **CORS**: Configura correctamente los orígenes permitidos en el backend.

4. **HTTPS**: Vercel proporciona HTTPS automáticamente. Tu API también debería usar HTTPS.

5. **Rate Limiting**: Considera implementar rate limiting en tu API.

6. **Ignored Builds y carpeta API**:
   - El archivo `.vercelignore` excluye completamente la carpeta `api/` de Vercel
   - El script `vercel-ignore-build.sh` evita builds cuando solo cambia `api/`:
     - ✅ Cambios en `client/` → Build procede
     - ✅ Cambios en archivos raíz → Build procede
     - ⏭️ Solo cambios en `api/` → Build se omite (ahorra tiempo y recursos)
   - **Importante**: Vercel solo procesa el frontend. El backend debe desplegarse por separado.

## 🐛 Troubleshooting

### Error: "Failed to load module"
- Verifica que todas las dependencias estén en `package.json`
- Ejecuta `npm install` en la carpeta `client/`

### Error: "API calls failing"
- Verifica la variable `VITE_API_URL` en Vercel
- Revisa la configuración de CORS en tu backend
- Comprueba que el backend esté funcionando

### Error: "404 on page refresh"
- El `vercel.json` ya incluye rewrites para SPA routing
- Si persiste, verifica que el archivo esté en la raíz del repo

## 📚 Referencias

- [Vercel Monorepo Guide](https://vercel.com/docs/concepts/monorepos)
- [Vite Deployment](https://vitejs.dev/guide/static-deploy.html)
- [NestJS Deployment](https://docs.nestjs.com/faq/deployment)
