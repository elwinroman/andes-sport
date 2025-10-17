# Etapa 1: Construcción
FROM node:20.8.1-alpine3.18 AS builder

WORKDIR /usr/src/app

# Instalar dependencias necesarias para compilación nativa
RUN apk add --no-cache python3 g++ make bash git

# Instalar pnpm globalmente
RUN npm install -g pnpm

# Copiar archivos de lock y package.json
COPY package.json pnpm-lock.yaml ./

# Instalar dependencias (sin scripts de postinstall para evitar fallos)
RUN pnpm install --frozen-lockfile --strict-peer-dependencies

COPY tsconfig*.json ./
COPY src ./src
RUN pnpm run build

# Etapa 2: Producción (imagen ligera)
FROM node:20.8.1-alpine3.18 AS production

WORKDIR /usr/src/app

RUN apk add --no-cache python3 g++ make bash git dos2unix
RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
# Instalar dependencias de producción + herramientas para migraciones
RUN pnpm install --frozen-lockfile --prod --strict-peer-dependencies
RUN pnpm add -D ts-node tsconfig-paths typeorm-ts-node-commonjs

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/src ./src
COPY --from=builder /usr/src/app/tsconfig*.json ./

# Copiar script de inicio, convertir CRLF a LF y dar permisos de ejecución
#COPY docker-entrypoint.sh /usr/src/app/docker-entrypoint.sh
#RUN dos2unix /usr/src/app/docker-entrypoint.sh && chmod +x /usr/src/app/docker-entrypoint.sh

ENV NODE_ENV=production

#ENTRYPOINT ["/usr/src/app/docker-entrypoint.sh"]
CMD ["node", "dist/main.js"]
