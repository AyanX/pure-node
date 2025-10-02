FROM "node:alpine"

COPY package*.json . 

RUN npm install

COPY . ./app

WORKDIR /app

EXPOSE 3000 3001 3002

CMD ["npm", "start"]