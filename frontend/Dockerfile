# Устанавливаем базовый образ
FROM node:20 AS builder
EXPOSE 3000
# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект
COPY . .

# Сборка проекта
RUN npm run build

CMD ["npm", "start"]