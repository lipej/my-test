FROM node:lts AS runner

WORKDIR /home/app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build

ENV NODE_ENV=prod

EXPOSE 3000

CMD [ "node", "dist/src/index.js" ]