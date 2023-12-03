FROM okteto.dev/node:18

COPY package.json ./
COPY package-lock.json ./
COPY apps/api ./apps/api
RUN npm ci .

COPY . .

RUN npm run build --prefix apps/api

ENV PORT 3000
EXPOSE 3000
ENTRYPOINT ["npm", "run", "--prefix", "apps/api"]
CMD ["start"]
