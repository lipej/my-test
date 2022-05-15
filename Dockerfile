FROM node:lts

ENV NODE_ENV prod

RUN npm i -g pnpm

WORKDIR /app

COPY  ["pnpm-lock.yaml", "package.json", "./"] 

COPY . .

RUN pnpm install

RUN npx prisma generate --schema=./apps/api/prisma/schema.prisma

RUN pnpm build

EXPOSE 3000 4000

CMD ["pnpm", "prod"]