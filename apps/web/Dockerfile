FROM okteto.dev/node:18

COPY package.json ./
COPY package-lock.json ./
COPY apps/web ./apps/web
RUN npm ci .

COPY . .

RUN npm run build --prefix apps/web

ENV PORT 8080
EXPOSE 8080
ENTRYPOINT ["npm", "run", "--prefix", "apps/web"]
CMD ["start"]
