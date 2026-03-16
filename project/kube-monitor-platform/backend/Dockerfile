FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./

RUN npm install

COPY . .

RUN npm run build || npx tsc

EXPOSE 5000

CMD ["npx", "ts-node", "src/server.ts"]
