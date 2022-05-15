FROM node:lts AS runner

WORKDIR /app

ADD ./ ./prisma/

CMD [ "npx", "prisma", "migrate", "deploy"]