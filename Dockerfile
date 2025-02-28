FROM node:alpine

WORKDIR /poprostuwitold/client

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install

COPY . .

EXPOSE 3020

CMD ["pnpm", "run", "dev"]