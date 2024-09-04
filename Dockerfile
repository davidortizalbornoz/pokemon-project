# Usa la imagen oficial de Node.js Alpine
FROM node:18-alpine

# Crea y establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de configuración
COPY package*.json ./

# Instala las dependencias
RUN npm ci

# Copia el código fuente
COPY . .

# Construye la aplicación
RUN npm run build

# Expone el puerto en el que se ejecutará la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "run", "start:prod"]
