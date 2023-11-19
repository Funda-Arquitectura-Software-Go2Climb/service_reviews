# Usa una imagen base de Node.js
FROM node:18.15.0

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia solo los archivos necesarios para instalar dependencias
COPY package*.json ./

# Instala Sequelize CLI de forma global
RUN npm install -g sequelize-cli

# Instala las dependencias
RUN npm install

# Ahora copia el resto de los archivos
COPY . .

# Ejecuta las migraciones de Sequelize
RUN npx sequelize db:migrate

# Expón el puerto en el que tu aplicación se ejecuta
EXPOSE 3001

# Establece el comando para iniciar la aplicación
CMD ["node", "server.js"]
