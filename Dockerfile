# 1 часть инструкции Client
# С помощью какой платформы (работает клиент или взаимодействуем) и указываем версию и обозначаем часть инструкии (as client)
FROM node:14 as client

# Обозначаю какая рабочая папка (произвольная)
WORKDIR /app/client

# Копируем локальные файлы и папки в образ (указываю какой файл и куда необходимо скопировать)
COPY client/package.json /app/client

# создаю команду запуска, чтобы установить зависимости
RUN npm install

# Копирую весь остальной код приложения (что и куда)
COPY client /app/client

# Запускаю скрипт build
RUN npm run build

# 2 часть инструкции

FROM node:16-alpine

WORKDIR /app

COPY server/package.json /app

RUN npm install

COPY server /app

# путь относиться к файлу для client - /app/client/build
# путь относиться к файлу для server - /app/client
COPY --from=client /app/client/build /app/client

# Какой порт работает в docker container (server запускается на localhost:8080)
EXPOSE 8080

# Использую команду CMD которая запускае production mode для приложения
CMD [ "npm", "start" ]