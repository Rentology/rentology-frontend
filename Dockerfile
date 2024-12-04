# Stage 1: Build the React app
FROM node:16 AS build

WORKDIR /app

# Копируем package.json и package-lock.json (если используется)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы, включая .env.production
COPY . .

# Собираем приложение с использованием .env.production
RUN npm run build

# Stage 2: Serve the build using Serve (instead of Nginx)
FROM node:16

WORKDIR /app

# Устанавливаем зависимость serve
RUN npm install -g serve

# Копируем собранное приложение в контейнер
COPY --from=build /app/build /app/build

# Открываем порт для serve
EXPOSE 5000

# Запускаем сервер serve для обслуживания статических файлов
CMD ["serve", "-s", "build", "-l", "5000"]
