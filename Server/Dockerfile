FROM node:20-alpine

WORKDIR /app/Server

COPY package*.json ./

RUN npm install

# rebuild bcrypt from source
RUN npm rebuild bcrypt --build-from-source

COPY . . 

EXPOSE 3001

CMD ["npm", "run", "prod"]
