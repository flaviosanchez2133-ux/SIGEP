# Dockerfile para el backend de SIGEP
FROM node:20-alpine

# Directorio de trabajo
WORKDIR /app

# Instalar dependencias del sistema
RUN apk add --no-cache openssl

# Copiar archivos de dependencias
COPY package*.json ./
COPY prisma ./prisma/

# Instalar dependencias
RUN npm ci

# Generar cliente Prisma
RUN npx prisma generate

# Copiar código fuente
COPY . .

# Exponer puerto
EXPOSE 3000

# Comando por defecto (se sobreescribe en docker-compose para dev)
CMD ["npm", "start"]
